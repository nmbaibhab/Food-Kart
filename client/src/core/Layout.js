import React from "react";
import Menu from "./Menu";
// import "../index.css";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => (
  <div>
    <Menu />
    <div className="mt-20">
      {/* <h5 className="">{title}</h5> */}
      {/* <p className='lead'>{description}</p> */}
      <div className={className}>{children}</div>
    </div>
  </div>
);

export default Layout;
