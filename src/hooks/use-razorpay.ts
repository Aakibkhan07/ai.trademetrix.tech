'use client';

import { useState, useCallback } from 'react';

interface RazorpayConfig {
  amount: number;
  plan: string;
  description?: string;
  name?: string;
  email?: string;
  contact?: string;
  onSuccess?: () => void;
}

function isTestMode(): boolean {
  if (typeof window === 'undefined') return false;
  return (process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '').startsWith('rzp_test');
}

export function useRazorpay() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ plan: string } | null>(null);

  const verifyPayment = useCallback(
    async (paymentId: string, orderId: string, plan: string, email?: string) => {
      const verifyRes = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          razorpay_signature: 'test_mode_skip_verification',
          email,
          plan,
        }),
      });

      const verification = await verifyRes.json();
      return verification.success;
    },
    []
  );

  const mockPayment = useCallback(
    async ({ amount, plan, email, onSuccess }: RazorpayConfig) => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch('/api/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount, plan, email }),
        });

        const order = await res.json();
        if (!res.ok) {
          setError(order.error || 'Failed to create order');
          setLoading(false);
          return;
        }

        const ok = await verifyPayment('test_pay_' + Date.now(), order.id, plan, email);
        if (ok) {
          setSuccess({ plan });
          setLoading(false);
          onSuccess?.();
        } else {
          setError('Test payment verification failed');
          setLoading(false);
        }
      } catch (err) {
        setError('Something went wrong');
        setLoading(false);
      }
    },
    [verifyPayment]
  );

  const loadScript = useCallback(() => {
    return new Promise<boolean>((resolve) => {
      if (typeof window !== 'undefined' && (window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }, []);

  const initiatePayment = useCallback(
    async (config: RazorpayConfig) => {
      if (isTestMode()) {
        await mockPayment(config);
        return;
      }

      const { amount, plan, description, name, email, contact, onSuccess } = config;
      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
        const scriptLoaded = await loadScript();
        if (!scriptLoaded) {
          setError('Failed to load payment gateway');
          setLoading(false);
          return;
        }

        const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
        if (!keyId) {
          setError('Payment not configured');
          setLoading(false);
          return;
        }

        const res = await fetch('/api/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount, plan, email }),
        });

        const order = await res.json();
        if (!res.ok) {
          setError(order.error || 'Failed to create order');
          setLoading(false);
          return;
        }

        const options = {
          key: keyId,
          amount: order.amount,
          currency: order.currency || 'INR',
          name: 'Trade Metrix Tech',
          description: description || `${plan} Plan`,
          order_id: order.id,
          image: '/favicon.ico',
          handler: async (response: any) => {
            const ok = await verifyPayment(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              plan,
              email
            );
            if (ok) {
              setSuccess({ plan });
              setLoading(false);
              onSuccess?.();
              return;
            }
            setError('Payment verification failed');
            setLoading(false);
          },
          prefill: {
            name: name || '',
            email: email || '',
            contact: contact || '',
          },
          theme: { color: '#EF4444' },
          modal: {
            ondismiss: () => {
              setLoading(false);
            },
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', (response: any) => {
          setError(response.error.description || 'Payment failed');
          setLoading(false);
        });
        rzp.open();
      } catch (err) {
        setError('Something went wrong');
        setLoading(false);
      }
    },
    [loadScript, mockPayment, verifyPayment]
  );

  const dismissSuccess = useCallback(() => setSuccess(null), []);

  return { initiatePayment, loading, error, success, dismissSuccess };
}
