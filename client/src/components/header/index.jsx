import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import classNames from 'classnames/bind'
import styles from './header.module.scss'

const cx = classNames.bind(styles)

const Header = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>
            <Link className={cx('nav-text')} to="/">
              <b>MIA MANAGER</b>
            </Link>
          </Navbar.Brand>
          <Nav className="me-auto">
              <Link className={cx('nav-text')} to="/product">PRODUCT</Link>
              <Link className={cx('nav-text')} to="/customer">CUSTOMER</Link>
              <Link className={cx('nav-text')} to="/order">ORDER</Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
