'use client';

import {
  Box,
  Flex,
  Icon,
  useColorModeValue,
  Image,
  Button,
  FlexProps,
  useDisclosure,
} from '@chakra-ui/react';
import { HiOutlineArrowLeftStartOnRectangle } from 'react-icons/hi2';
import { FaRegUserCircle } from 'react-icons/fa';
import { RiUserSearchLine, RiHome7Line, RiHeart3Fill } from 'react-icons/ri';
import { IconType } from 'react-icons';
import { Link, useNavigate } from 'react-router-dom';
import { clearAuthData } from '../../app/store/store-auth-slice';
import { useDispatch } from 'react-redux';
import { CreatePostModal } from './item-post-modal';

// Definisi tipe data untuk setiap link item
interface LinkItemProps {
  name: string;
  icon: IconType;
  routelink: string;
}

// Definisi tipe untuk NavItem Props
interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
  routelink: string;
}

// Daftar navigasi sidebar
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: RiHome7Line, routelink: '/' },
  { name: 'Search', icon: RiUserSearchLine, routelink: '/search' },
  { name: 'Follows', icon: RiHeart3Fill, routelink: '/follows' },
  { name: 'Profile', icon: FaRegUserCircle, routelink: '/profile' },
];

// Komponen untuk setiap item navigasi
const NavItem = ({ icon, children, routelink, ...rest }: NavItemProps) => {
  return (
    <Link
      to={routelink}
      style={{ textDecoration: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'tweet.post',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

// Komponen untuk Sidebar
const SidebarContent = ({ ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      bg={useColorModeValue('black', 'white')}
      textColor="tweet.putih"
      h="80vh"
      {...rest}
    >
      <Flex
        ml="2"
        mt="20px"
        flexDir="column"
        gap="2"
      >
        <Image
          src="https://res.cloudinary.com/dje40bx3b/image/upload/v1728317302/circle-image/pc6finzpiepopaudfwtf.png"
          h="48px"
          objectFit="contain"
        />
        {LinkItems.map((link) => (
          <NavItem
            key={link.name}
            icon={link.icon}
            routelink={link.routelink}
          >
            {link.name}
          </NavItem>
        ))}
        <Button
          bgColor="tweet.green"
          color="tweet.putih"
          _hover={{
            bg: 'tweet.post',
            color: 'white',
          }}
          onClick={onOpen}
        >
          Create Post
        </Button>
      </Flex>
      <CreatePostModal
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
};

// Komponen untuk Footer Sidebar
const SidebarFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Fungsi untuk menangani logout
  const handleLogout = () => {
    dispatch(clearAuthData()); // Hapus data auth dari Redux dan localStorage
    navigate('/login'); // Arahkan pengguna ke halaman login
  };
  return (
    <Box ml="4">
      <Button
        color="tweet.putih"
        variant="link"
        onClick={handleLogout}
        leftIcon={<HiOutlineArrowLeftStartOnRectangle />}
      >
        Log Out
      </Button>
    </Box>
  );
};

// Komponen utama Sidebar dengan Header
const SidebarLeft = () => {
  return (
    <Box
      as="aside"
      w="100%"
      h="100vh"
      position="sticky" // Menjadikan sidebar sticky
      top="0" // Sticky mulai dari 0px dari atas layar
      bg="black"
      color="white"
      p="20px"
    >
      <SidebarContent />
      <SidebarFooter />
    </Box>
  );
};

export default SidebarLeft;
