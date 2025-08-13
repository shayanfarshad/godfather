import { useState, useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { loginThunk } from 'src/app/store/slices';

export function useLoginLogic() {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(s => s.Auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // simple validation
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});
  const validate = () => {
    const e: typeof errors = {};
    if (!email || !email.includes('@')) e.email = 'auth.errors.email';
    if (!password || password.length < 6) e.password = 'auth.errors.password';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = () => {
    if (!validate()) return;
    dispatch(loginThunk({ email, password }));
  };

  // entrance animation
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(20)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(slide, { toValue: 0, useNativeDriver: true })
    ]).start();
  }, []);

  return { email, setEmail, password, setPassword, submit, errors, status, error, fade, slide };
}
