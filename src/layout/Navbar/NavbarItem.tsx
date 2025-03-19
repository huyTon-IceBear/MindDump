import { NavbarItemProps } from "@/types/layout";
import { NavLink, Text } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";

export default function NavItem({
  icon,
  label,
  href,
  active,
  navbarOpened,
}: NavbarItemProps) {
  return (
    <NavLink
      component="button"
      href={href}
      active={active}
      leftSection={icon}
      label={
        <AnimatePresence mode="wait">
          {navbarOpened && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <Text size="sm">{label}</Text>
            </motion.div>
          )}
        </AnimatePresence>
      }
      style={{
        borderRadius: navbarOpened ? "0px 20px 20px 0px" : "50%",
        width: navbarOpened ? "100%" : "40px", // Adjust width based on navbar state
        marginLeft: navbarOpened ? "0px" : "20px",
        paddingLeft: navbarOpened ? "30px" : "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: navbarOpened ? "flex-start" : "center",
        transition: "all 0.3s ease", // Smooth transition
      }}
    />
  );
}
