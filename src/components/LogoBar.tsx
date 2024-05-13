import { ModeToggle } from './ModeToggle';
import { Link } from '@tanstack/react-router';

const LogoBar = () => {
  return (
    <div className="mx-auto flex max-w-screen-md items-center gap-4 px-4 py-2">
      <Link to="/" search={{ page: 1 }}>
        <p className="group text-lg font-bold text-primary">
          <span className="text-muted-foreground group-hover:text-primary">{'<'}</span>Blog
          <span className="text-muted-foreground group-hover:text-primary">{' />'}</span>{' '}
        </p>
      </Link>
      <Link
        to="/about"
        className="ml-auto text-lg font-bold underline-offset-8 transition-colors hover:text-primary [&.active]:text-primary [&.active]:underline"
      >
        About
      </Link>
      <ModeToggle />
    </div>
  );
};

export default LogoBar;
