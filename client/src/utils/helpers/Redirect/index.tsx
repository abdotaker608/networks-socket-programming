import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export interface RedirectProps {
  to: string;
  replace?: boolean;
  state?: any;
}

const Redirect: React.FC<RedirectProps> = ({
  to,
  replace = false,
  state = {},
}) => {
  //router navigation
  const navigate = useNavigate();

  //redirect to the given route upon mounting
  useEffect(() => {
    navigate(to, { replace, state });
  }, []);

  return <></>;
};

export default Redirect;
