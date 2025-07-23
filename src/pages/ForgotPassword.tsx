import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert } from '@/components/ui/alert';
import { ArrowLeft } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const [input, setInput] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  // Helper to check if input is email or phone
  const isEmail = (val: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val);
  // Accept only 10-digit numbers for phone, and treat as Indian (+91)
  const isPhone = (val: string) => /^\d{10}$/.test(val.trim());

  // Handle submit (send reset email or OTP)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(''); setErr('');
    if (isEmail(input)) {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(input, {
        redirectTo: window.location.origin + '/reset-password',
      });
      setLoading(false);
      if (error) setErr(error.message);
      else setMsg('Password reset email sent! Check your inbox.');
    } else if (isPhone(input)) {
      setLoading(true);
      // Always prepend +91 for Indian numbers
      const phoneWithCountry = '+91' + input.trim();
      const { error } = await supabase.auth.signInWithOtp({ phone: phoneWithCountry });
      setLoading(false);
      if (error) setErr(error.message);
      else {
        setOtpSent(true);
        setMsg('OTP sent! Check your SMS.');
      }
    } else {
      setErr('Please enter a valid email or 10-digit Indian phone number.');
    }
  };

  // Handle OTP verification and password reset
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(''); setErr('');
    setOtpLoading(true);
    const phoneWithCountry = '+91' + input.trim();
    const { data, error } = await supabase.auth.verifyOtp({
      phone: phoneWithCountry,
      token: otp,
      type: 'sms',
    });
    if (error) {
      setOtpLoading(false);
      setErr(error.message);
      return;
    }
    // Now update password
    const { error: pwError } = await supabase.auth.updateUser({ password: newPassword });
    setOtpLoading(false);
    if (pwError) setErr(pwError.message);
    else {
      setResetSuccess(true);
      setMsg('Password reset successful! You can now log in.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 p-4 relative">
      <button onClick={() => window.location.href = '/login'} className="absolute top-6 left-6 flex items-center text-muted-foreground hover:text-primary transition-colors z-20">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Sign In
      </button>
      <Card className="glass-card w-full max-w-md border-0 shadow-2xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-urbanist font-bold">Forgot Password</CardTitle>
          <p className="text-muted-foreground">Enter your email or phone number to reset your password</p>
        </CardHeader>
        <CardContent>
          {!otpSent && !resetSuccess && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="input">Email or Phone Number</Label>
                <Input
                  id="input"
                  type="text"
                  placeholder="Enter your email or 10-digit phone number"
                  value={input}
                  onChange={e => setInput(e.target.value.replace(/[^\d@.a-zA-Z]/g, ''))}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link/OTP'}
              </Button>
              {err && <Alert variant="destructive">{err}</Alert>}
              {msg && <Alert>{msg}</Alert>}
            </form>
          )}
          {otpSent && !resetSuccess && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter the OTP you received"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={otpLoading}>
                {otpLoading ? 'Verifying...' : 'Verify & Reset Password'}
              </Button>
              {err && <Alert variant="destructive">{err}</Alert>}
              {msg && <Alert>{msg}</Alert>}
            </form>
          )}
          {resetSuccess && (
            <Alert>Reset successful! You can now <a href="/login" className="text-primary underline">log in</a>.</Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword; 