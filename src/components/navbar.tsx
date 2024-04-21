import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import "../styles/globals.css"
import React from 'react'
import {useAuth} from "../pages/AuthContext"



const CustomNavbar: React.FC<NavbarProps> = () => {
    const { isLoggedIn, username } = useAuth();
    console.log(isLoggedIn)
    return (
        <>
    <Navbar style={{height:"10vh"}}>
      <NavbarBrand>
       
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {isLoggedIn ? (
            <>
            <NavbarItem>
        <Button as={Link} color="primary" href="/add" variant="flat">
          Add Image
        </Button>
      </NavbarItem>
      <NavbarItem>
        <Button as={Link} color="primary" href="/api/auth/logout" variant="flat">
          Log Out
        </Button>
      </NavbarItem>
            </>
        
        ) : (
            <>
            <NavbarItem>
          <Button as={Link} color="primary" href="/api/auth/login" variant="flat">
            Log In
          </Button>
        </NavbarItem>
        {/* <NavbarItem>
          <Button as={Link} color="primary" href="/api/auth/login" variant="flat">
            Sign Up
          </Button>
        </NavbarItem></> */}
        </>
        )   
    }
      </NavbarContent>
    </Navbar>
    </>
    )
}

export default CustomNavbar;