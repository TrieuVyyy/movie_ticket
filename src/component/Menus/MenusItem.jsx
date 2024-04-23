import React from "react";
import { randomColor } from "../../utils/index";
import { Link } from "react-scroll";

export default function MenusItem(props) {
  const { name, Icon, to } = props;
  return (
    <Link
      activeClass="active"
      to={to}
      spy={true}
      smooth={true}
      offset={-70}
      duration={500}
      className="subMenus flex items-center ml-1 px-1 py-1 cursor-pointer"
    >
      <Icon className="text-2xl mr-2" style={{ color: randomColor(1) }} />
      <span className="text-base font-normal text-slate-300 hover:text-white">
        {name}
      </span>
    </Link>
    
  );
}
