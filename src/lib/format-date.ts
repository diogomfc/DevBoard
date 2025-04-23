export const formatDate = (dateString?: string) => {
  if (!dateString) return 'Desconhecida';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};