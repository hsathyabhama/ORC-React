import { Layout } from "antd";
const { Footer } = Layout;

function FooterElement() {
  return (
    <Footer style={{ textAlign: "center" }}>
      &copy; 2021
      <a
        href="http://www.v-enertek.com/"
        style={{ color: "#1890ff" }}
        target="_blank"
      >
        VAIGUNTH ENER TEK (P) LTD.
      </a>{" "}
      ALL RIGHTS RESERVED.
    </Footer>
  );
}
export default FooterElement;
