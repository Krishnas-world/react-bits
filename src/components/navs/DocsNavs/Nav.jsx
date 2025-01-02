import { Box, Button, Divider, Drawer, DrawerBody, DrawerContent, DrawerOverlay, Flex, Icon, IconButton, Image, Spinner, useDisclosure } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/logos/reactbits-logo.svg';
import { ArrowForwardIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { IoLogoGithub } from "react-icons/io";
import { TiStarFullOutline } from "react-icons/ti";
import { useEffect, useState } from 'react';
import { getStarsCount } from '../../../utils/utils';
import { BlurText } from '../../../content/TextAnimations/BlurText/BlurText';

const Nav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [stars, setStars] = useState(0);

  useEffect(() => {
    const fetchStars = async () => {
      const count = await getStarsCount();
      setTimeout(() => {
        setStars(count);
      }, 1000);
    };

    fetchStars();
  }, []);

  return (
    <Box zIndex={100} className='main-nav'>
      <Flex className='nav-items' h={20} alignItems="center" justifyContent="space-between">
        <Link to="/" className='logo'>
          <Image src={Logo} alt="Logo" />
        </Link>

        {/* Hamburger menu button for small screens */}
        <IconButton
          size="md"
          icon={<HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={onOpen}
        />

        {/* Links for larger screens */}
        <Flex display={{ base: 'none', md: 'flex' }} alignItems="center" gap={8}>
          <Button as="a" href='https://github.com/DavidHDev/react-bits' rel='noreferrer' target='_blank' bg="white" color="black" fontSize="xs" h={8} _hover={{ bg: 'white', transform: 'scale(0.95)' }}>
            <Icon as={IoLogoGithub} />
            &nbsp;Star on GitHub
            <Icon ml={2} mr={0.5} as={TiStarFullOutline} />
            {stars ? <BlurText delay={20} text={String(stars)} /> : <Box><Spinner boxSize={2} /></Box>}
          </Button>
          <Link to="/text-animations/split-text" mx={2} fontWeight="bold">
            Docs
          </Link>
          <Link to="https://github.com/DavidHDev/react-bits" target='_blank' mx={2} fontWeight="bold">
            GitHub<ArrowForwardIcon boxSize={5} transform={"rotate(-45deg)"} position="relative" top="-1px" />
          </Link>
        </Flex>
      </Flex>

      {/* Drawer for mobile navigation */}
      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay display={{ md: 'none' }}>
          <DrawerContent bg="black" h={'100%'}>
            <DrawerBody px={0} py={0}>
              <Flex direction="column">
                <Flex alignItems="center" justifyContent="space-between" h={'57px'} mb={6} borderBottom={"1px solid #ffffff1c"} px={6}>
                  <Image src={Logo} alt="Logo" height="25px" />
                  <IconButton
                    size="md"
                    icon={<CloseIcon boxSize={3} />}
                    aria-label="Close Menu"
                    display={{ md: 'none' }}
                    onClick={onClose}
                  />
                </Flex>
                <Flex direction="column" px={6}>
                  <p>Useful Links</p>
                  <Link to="/text-animations/split-text" display="block" mb={2} onClick={onClose}>
                    Docs
                  </Link>
                  <Link to="https://github.com/DavidHDev/react-bits" target='_blank' display="block" mb={2} onClick={onClose}>
                    GitHub <ArrowForwardIcon boxSize={7} transform={"rotate(-45deg)"} position="relative" top="-1px" />
                  </Link>
                  <Divider />
                  <p>Other</p>
                  <Link to="https://davidhaz.com/" target='_blank' display="block" mb={2} onClick={onClose}>
                    Who made this?<ArrowForwardIcon boxSize={7} transform={"rotate(-45deg)"} position="relative" top="-1px" />
                  </Link>
                </Flex>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
}

export default Nav;