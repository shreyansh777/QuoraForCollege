import { makeStyles } from "@mui/styles";
import { deepPurple } from "@mui/material/colors";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 50px",

    //flexDirection:'column',
  },
  heading: {
    color: "rgba(0,183,255, 1)",
    textDecoration: "none",
    fontSize: "2em",
    fontWeight: 300,
  },
  image: {
    marginLeft: "10px",
    marginTop: "5px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "300px",
    alignItems: "center",
  },
  logout: {
    marginLeft: "20px",
    width: "80px",
  },
  userName: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-between",
    //width: "260",
    marginLeft: "10px",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  purple: {
    color: deepPurple[100],
    backgroundColor: deepPurple[500],
    //width: "40px",
  },
  titleDesign: {
    //textDecoration: "underline",
  },
  combine: {
    display: "flex",
    justifyContent: "flex-start",
    //width: "200px",
  },
}));
