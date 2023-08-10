const requiredFormValue = (label: string) => {
  return {
    required: { value: true, message: `${label}이(가) 입력되지 않았습니다.` },
    pattern: { value: /^(?!\s*$).+/, message: `${label}이(가) 입력되지 않았습니다.` },
  };
};

export default requiredFormValue;
