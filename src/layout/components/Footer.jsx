import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import Logo from "../../assets/simya_favicon.png";

const FooterContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  marginTop: "4rem",
  padding: "2rem 1rem",
  borderTop: "1px solid #3d3a52",
  background: "#121117",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "5rem",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "1.5rem",
  },
}));

const FooterSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.75rem",
});

const FooterTitle = styled(Typography)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.4rem",
  fontSize: "1rem",
  color: "#eeecff",
  fontFamily: "Mona8x12",
  fontWeight: "bold",
});

const FooterDesc = styled(Typography)({
  fontSize: "0.75rem",
  color: "rgba(255,255,255,0.45)",
  fontFamily: "Mona8x12",
  textAlign: "center",
  lineHeight: 1.6,
  maxWidth: "600px",
});

const FooterSmall = styled(Typography)({
  fontSize: "0.7rem",
  color: "rgba(255,255,255,0.25)",
  fontFamily: "Mona8x12",
  textAlign: "center",
  lineHeight: 1.6,
});

const FooterLink = styled("a")({
  fontSize: "0.75rem",
  color: "#c4bdff",
  fontFamily: "Mona10x12",
  textDecoration: "none",
  borderBottom: "1px solid rgba(196,189,255,0.3)",
  paddingBottom: "2px",
  transition: "all 0.15s ease",

  "&:hover": {
    opacity: 0.7,
    borderColor: "#c4bdff",
  },
});

const Divider = styled(Box)(({ theme }) => ({
  width: "1px",
  height: "60px",
  background: "linear-gradient(to bottom, transparent, #3d3a52, transparent)",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "1px",
    background: "linear-gradient(to right, transparent, #3d3a52, transparent)",
  },
}));

const Footer = () => {
  return (
    <FooterContainer>
      <FooterSection>
        <FooterTitle>
          <Box component="img" src={Logo} sx={{ height: "1rem" }} />
          시먀
        </FooterTitle>

        <FooterDesc>
          심야잡화점 유저를 위한 비공식 공략 사이트입니다.
        </FooterDesc>
      </FooterSection>

      <Divider />

      <FooterSection>
        <FooterSmall>
          사이트에 사용된 이미지 및 콘텐츠의 저작권은 원작자 '심야잡화점' 및
          해당 권리자에게 있으며, 문제 발생 시 요청에 따라 즉시 수정 또는
          삭제됩니다.
        </FooterSmall>

        <FooterSmall>© 2026 Simya</FooterSmall>
      </FooterSection>
    </FooterContainer>
  );
};

export default Footer;
