import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, ArrowRight } from 'lucide-react';

export function VerifyEmail() {
  const { user, isEmailVerified } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  React.useEffect(() => {
    if (isEmailVerified) {
      navigate(from, { replace: true });
    }
  }, [isEmailVerified, navigate, from]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-[calc(100vh-16rem)] bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="text-yellow-500" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Verify your email</h1>
          <p className="text-slate-300">
            We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
          <div className="text-center">
            <p className="text-white mb-4">
              Verification email sent to:
              <br />
              <span className="font-medium">{user.email}</span>
            </p>
            <p className="text-slate-300 text-sm mb-6">
              Once verified, you'll be automatically redirected to continue.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              Continue to Dashboard
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}