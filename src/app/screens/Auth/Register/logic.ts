import { useState, useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { registerThunk } from 'src/app/store/slices';

export function useRegisterLogic() {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(s => s.Auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [errors, setErrors] = useState<{name?: string; email?: string; password?: string; confirm?: string}>({});
  const validate = () => {
    const e: typeof errors = {};
    if (!name || name.length < 2) e.name = 'auth.errors.name';
    if (!email || !email.includes('@')) e.email = 'auth.errors.email';
    if (!password || password.length < 6) e.password = 'auth.errors.password';
    if (confirm !== password) e.confirm = 'auth.errors.confirm';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = () => { if (validate()) dispatch(registerThunk({ name, email, password })); };

  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(20)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(slide, { toValue: 0, useNativeDriver: true })
    ]).start();
  }, []);

  return { name, setName, email, setEmail, password, setPassword, confirm, setConfirm, errors, submit, status, error, fade, slide };
}
