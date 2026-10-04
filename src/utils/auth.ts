// auth.ts — Supabase Subscription & Session Management
export const SUPABASE_URL = 'https://hjzzvzxhrqovvducnxha.supabase.co';
export const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhqenp2enhocnFvdnZkdWNueGhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5NDY0MTksImV4cCI6MjA5NzUyMjQxOX0.XfFimXnkKHFBlYUE-E7daaBNjPJZV-D21UfCL_1SeoQ';
export const SESSION_KEY = 'lingua_session_v1';

export interface UserSession {
  phone: string;
  verified: boolean;
  loginAt?: number;
}

export function getSession(): UserSession | null {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  } catch {
    return null;
  }
}

export function isLoggedIn(): boolean {
  const s = getSession();
  return !!(s && s.phone && s.verified);
}

export function saveSession(phone: string): void {
  const session: UserSession = {
    phone: phone.trim(),
    verified: true,
    loginAt: Date.now(),
  };
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {}
}

export function logout(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {}
}

// بررسی اشتراک فعال (بر اساس کد ۵ رقمی که در phone ذخیره شده)
export async function verifySubscriptionCode(code: string): Promise<{ success: boolean; message?: string }> {
  const cleanCode = code.trim();
  if (!cleanCode) {
    return { success: false, message: 'لطفاً کد اشتراک را وارد کنید.' };
  }

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/subscriptions?phone=eq.${encodeURIComponent(cleanCode)}&is_active=eq.true&limit=1`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: 'Bearer ' + SUPABASE_KEY,
        },
      }
    );

    if (!res.ok) {
      return { success: false, message: 'خطا در برقراری ارتباط با سرور. لطفاً مجدداً تلاش کنید.' };
    }

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return { success: false, message: 'کد اشتراک نامعتبر است یا اشتراک شما فعال نمی‌باشد.' };
    }

    saveSession(cleanCode);
    return { success: true };
  } catch {
    return { success: false, message: 'خطا در بررسی اشتراک. اتصال اینترنت خود را بررسی کنید.' };
  }
}

export async function verifySession(): Promise<boolean> {
  const session = getSession();
  if (!session || !session.phone) return false;

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/subscriptions?phone=eq.${encodeURIComponent(session.phone)}&is_active=eq.true&limit=1`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: 'Bearer ' + SUPABASE_KEY,
        },
      }
    );
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      logout();
      return false;
    }
    return true;
  } catch {
    return false;
  }
}
