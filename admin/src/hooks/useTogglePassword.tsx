import { useState } from 'react';

export const useTogglePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(prev=>!prev)
  return { showPassword, togglePassword };
}
