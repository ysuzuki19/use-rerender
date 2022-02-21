import { useState } from 'react';

export default function useReRender() {
  const [, setRender] = useState<boolean>(false);
  const reRender = () => {
    setRender((e) => !e);
  };
  return reRender;
}
