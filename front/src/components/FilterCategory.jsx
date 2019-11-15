import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ValorationContainer from "../containers/ValorationContainer";

const useStyles = makeStyles({
  card: {
    maxWidth: 400,
    maxHeigth: 600,
    border: 0
  },
  media: {
    height: 300,
    width: 400
  },
  height: {
    height: 400
  }
});

function FilterCategory({ products, handleAdd }) {
  const classes = useStyles();

  if (products.length === 0) {
    return (
      <div>
        <Typography style={{ fontFamily: "courier", fontSize: "30px", display: "flex", flexDirection: "row", marginTop: "70px", alignItems: "center", }}>
          404 Not found
        </Typography>
      </div>
    );
  } else {
    return products.map(item => (
      <div style={{ order: "1" }} key={item.name}>
        <Link style={{ textDecoration: "none" }} to={`/product/${item.name}`}>
          <Card className={classes.card}>
            <CardActionArea className={classes.height}>
              <CardMedia
                className={classes.media}
                component="img"
                height="140"
                image={item.img}
              />
              <CardContent>
                <Typography style={{ fontFamily: "courier" }} gutterBottom variant="h8" component="h2">
                  {String(item.name).toUpperCase()}
                </Typography>
                <Typography style={{ fontFamily: "courier" }} gutterBottom variant="h8" component="h3">
                  $ {item.price}
                </Typography>
                <ValorationContainer comments={item.commentsP} />
              </CardContent>

            </CardActionArea>
            <CardActions
              style={{
                display: "flex",
                flexDirection: "row",
                justifyConten: "flex-end"
              }}
            >
              <div>
                <Button>
                  <img
                    id={item.id}
                    onClick={handleAdd}

                    src={"/e70570ee529d8e7f5cc3344bf2d8ceb2.png"}
                    style={{
                      height: "30px",
                      width: "30px"
                    }}
                  />
                </Button>
              </div>
            </CardActions>
          </Card>
        </Link>
      </div>
    ));
  }
}

export default FilterCategory;
