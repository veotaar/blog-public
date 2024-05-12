import { ModeToggle } from './ModeToggle';
import { Link } from '@tanstack/react-router';

const LogoBar = () => {
  return (
    <div className="mx-auto flex max-w-screen-md items-center justify-between border-b px-4 py-2">
      <Link to="/" search={{ page: 1 }}>
        <p className="text-lg font-bold text-primary">Blog</p>
      </Link>
      <ModeToggle />
    </div>
  );
};

export default LogoBar;
