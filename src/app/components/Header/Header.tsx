import { Button } from '..';

export const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <div>Realworld Blog</div>
      <div className="flex gap-[19px] items-center">
        <span className="w-[84px]">Sign In</span>
        <Button variant="outlined" colorDefault="green" className="h-[50px] max-w-[109px]">
          Sign Up
        </Button>
      </div>
    </div>
  );
};
