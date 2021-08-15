export const useLineStyle = (color: string, secondaryColor: string) => {
  const cardStyle = {
    background: `radial-gradient(116.96% 153.22% at 131.9% -61.54%, ${color} -180%, rgba(28, 29, 37, 0) 100%), ${secondaryColor}`,
  };
  const lineStyle = {
    background: color,
    boxShadow: `-2px 3px 17px ${color}`,
  };

  return { cardStyle, lineStyle };
};
