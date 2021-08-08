import "./marketplace.scss";
import { useEffect, useState } from "react";
import ProductList from "../productList/ProductList";
import { validateSession_id, getAmazonData, purchaseProduct } from "../../requests";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const stop = 1


export default function Marketplace() {
  
  const [username, setUsername] = useState("")
  const [money, setMoney] = useState(0)
  const [email, setEmail] = useState("")
  const [allowance, setAllowance] = useState(0)
  const [interest, setInterest] = useState(0);
  const [date, setDate] = useState("")
  validateSession_id().then((r) => {setInterest(r.interest); 
                                    setUsername(r.username); 
                                    setMoney(r.money); 
                                    setEmail(r.email); 
                                    setAllowance(r.allowance);
                                    setDate(r.date)  
                                    console.log("the final values are", username, email, money, interest)})
  
  // initial use state submenu selected is "featured". setSelected is used to determine the page to take the user to, when selected
  const [selected, setSelected] = useState("featured");

  // Blank in initial state. Used for the data of projects in each subsection. setData changes the data with the switch cases in useEffect()
  const [data, setData] = useState([]);
  const [all, setAll] = useState([]);

  const current = 1
  
  var bounds = [[0, 10], [10, 25], [25, 50], [50, 100], [100, 1000000]]
  var allData = [[], [], [], [], []]

  useEffect(() => {
        getAmazonData().then((response) => {return response}).then((r) => {
            r.sort(function(a, b) {return a.price < b.price})
            
            for (var j = 0; j < r.length; ++j) {
                for (var i = 0; i < bounds.length; ++i) {
                    if (r[j].price >= bounds[i][0] && r[j].price < bounds[i][1]) {
                        allData[i].push(r[j])
                    }
                }
            }
            console.log("this is alldata", allData)
            setData(r)
            setAll(allData)
        })
  }, [current])

  console.log("this is all", all)

  const useStyles = makeStyles({
    root: {
      width: "300px",
      height: "auto"
    },
    media: {
      height: 140,
    },
  });

  // holds all the titles for the submenu in the projects section
  const list = [
    {
      id: "0-10",
      title: "$0 - $10",
    },
    {
      id: "10-25",
      title: "$10 - $25",
    },
    {
      id: "25-50",
      title: "$25 - $50",
    },
    {
      id: "50-100",
      title: "$50 - $100",
    },
    {
      id: "100+",
      title: "$100+",
    },
  ];

  // every time the selected value changes (at the bottom of the function), useEffect() will be run
  useEffect(() => {
    switch (selected) {
      case "0-10":
        setData(all[0]);
        break;
      case "10-25":
        setData(all[1]);
        break;
      case "25-50":
        setData(all[2]);
        break;
      case "50-100":
        console.log(4)
        setData(all[3]);
        break;
      case "100+":
        setData(all[4]);
        break;
      default:
        setData(all[0]);
    }
  }, [selected]);

  if (typeof data !== "undefined") {
    return (
        <div className="marketplace" id="marketplace" style={{overflow: "visible"}}>
            <ul>
                {/* goes through EACH title (e.g. featured, mobile, web, etc...) and shows all the titles for submenu in Projects section.*/}
                {list.map((item) => (
                <ProductList
                    title={item.title}
                    // sending true or false if the selected item is the same as the item id
                    active={selected === item.id}
                    // sending the setSelected function to use for each submenu item.
                    setSelected={setSelected}
                    id={item.id}
                />
                ))}
            </ul>
            <div className="container" style={{minHeight: "100vh", overflow: "visible"}}>
                {/* shows all item images and titles for the current chosen submenu (e.g. featured, mobile, web, etc...). setData is used in useEffect() to change the shown data (projects) */}
                {data.map((data) => {
                    console.log(data.name, data.price, data.image, data.link, data.ASIN, email)
                    return (
                        <Card style={{width: "30%", minHeight: "65vh", maxHeight: "65vh", position: "relative", margin: "20px"}}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    style={{width: "100%", minHeight: "45vh", maxHeight: "45vh"}}
                                    src={data.image}
                                    title={data.name}
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {data.name} -- ${data.price}
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions style={{bottom: 8, position: "absolute"}}>
                                <Button size="small" color="primary" onClick={() => window.open(data.link)}>
                                    View
                                </Button>
                                <Button size="small" color="primary" 
                                    onClick={() => { 
                                        console.log(money, data.price)
                                        if (money >= data.price) {
                                            purchaseProduct(data.name, data.price, data.image, data.link, data.ASIN, email)
                                            alert("Purchased!")
                                        } else {
                                            alert("Not enough money to purchase")
                                        }
                                    }}>
                                   Buy
                                </Button>
                            </CardActions>
                        </Card>
                    )
                })}
            </div>
        </div>
    );
  } else {
     return (<div></div>)
  }
}
