import { useFadeIn } from '../hooks/useFadeIn';

const FadeInSection = ({ children, delay = 0, className = '' }) => {
  const [ref, isVisible] = useFadeIn({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
      }}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
