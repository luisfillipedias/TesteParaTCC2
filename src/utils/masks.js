/**
 * utilitários de máscara e validação para o RegulaSUS
 */

export const maskPhone = (val) => {
  if (!val) return '';
  let v = val.replace(/\D/g, '').substring(0, 11);
  if (v.length > 10) return v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  if (v.length > 6) return v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  if (v.length > 2) return v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
  return v;
};

export const maskCns = (val) => {
  if (!val) return '';
  let v = val.replace(/\D/g, '').substring(0, 15);
  const parts = [];
  if (v.length > 0) parts.push(v.substring(0, 3));
  if (v.length > 3) parts.push(v.substring(3, 7));
  if (v.length > 7) parts.push(v.substring(7, 11));
  if (v.length > 11) parts.push(v.substring(11, 15));
  return parts.join(' ');
};

export const maskDate = (val) => {
  if (!val) return '';
  let v = val.replace(/\D/g, '').substring(0, 8);
  if (v.length > 4) return v.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
  if (v.length > 2) return v.replace(/(\d{2})(\d{1,2})/, '$1/$2');
  return v;
};

export const maskCpf = (val) => {
  if (!val) return '';
  let v = val.replace(/\D/g, '').substring(0, 11);
  if (v.length > 9) return v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
  if (v.length > 6) return v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
  if (v.length > 3) return v.replace(/(\d{3})(\d{1,3})/, '$1.$2');
  return v;
};

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validateDate = (dateStr) => {
  if (!dateStr || dateStr.length < 10) return false;
  const [day, month, year] = dateStr.split('/').map(Number);
  const d = new Date(year, month - 1, day);
  return d && d.getFullYear() === year && d.getMonth() + 1 === month && d.getDate() === day;
};
