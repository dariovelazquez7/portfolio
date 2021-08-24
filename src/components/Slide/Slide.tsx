import React,{ useState } from 'react';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./slide.css"
import About from "../About/About"
import Contact from '../Contact/Contact';
import Projects from '../Projects/Projects';
import Home from "../Home/Home"
import List from '@material-ui/core/List';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';
import AppsIcon from '@material-ui/icons/Apps';
import PersonIcon from '@material-ui/icons/Person';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles((theme:Theme) =>
createStyles({ 
 container:{
  display: "flex",
 },
  marginR:{
    marginRight: "10px",
  },
  hoverBtn:{
    borderRadius: "10px",
    transition: "ease-in",
    "&:hover":{
      borderRadius: "10px",
     background: "rgb(218, 218, 218, 0.1)",
     transition: "ease-in",
    }
  },
  arrow: {
    position: "absolute",
    left: "45%",
    transform: "translateY(-50%)",
    WebkitTransform:"translateY(-50%)",
    fill: "#fff",
    cursor: "pointer",
  },

  iconArrowUp:{
    height:"65px",
    width: "65px",
    top: "30px",
    
  },
  iconArrowDown:{
    height:"65px",
    width: "65px",
    bottom: "-40px",
    top: "auto",
  },
  arrowDisabled: {
    display: "none"  
  }
})
)


export default function Slide (){
  

  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    vertical: true,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide)
    },
  })

  const classes = useStyles()
  return (
    <div className={classes.container}>
      <div className="navigation-wrapper"> 
      </div>
      {slider && (
      <div className="dots">
          {[...Array(slider.details().size).keys()].map((idx) => {
            return (
              <List key={idx} style={{margin: "0 10px"}}>
              <ListItem button  onClick={() => {
                    slider.moveToSlideRelative(idx)
                  }}
                  className={"dot" + (currentSlide === idx ? " active" : "")}
                  classes={{root: classes.hoverBtn}}
                  >
                    {
                    idx === 0? 
                    <HomeIcon classes={{root:classes.marginR}}/>:
                    idx === 1? 
                    <PersonIcon classes={{root:classes.marginR}}/>:
                    idx === 2?
                     <AppsIcon classes={{root:classes.marginR}}/>:
                     idx === 3?
                      <EmailIcon classes={{root:classes.marginR}}/>: false
                    }
             <ListItemText primary={
                    idx === 0?
                    "Home":idx === 1? 
                    "About":idx === 2? 
                    "Projects":idx === 3? 
                    "Contact": false}
                    />
           </ListItem>
           </List>  
            )
          })}
          </div>
         
      )}
      <div ref={sliderRef} className="keen-slider" >
        <div className="keen-slider__slide slide" ><Home/></div>
        <div className="keen-slider__slide slide" ><About/></div>
        <div className="keen-slider__slide slide" ><Projects/></div> 
        <div className="keen-slider__slide slide" ><Contact/></div>
        
        {slider && (
          <>
            <ArrowUp
              onClick={(e:any) => e.stopPropagation() || slider.prev()}
              disabled={currentSlide === 0}
            />
            <ArrowDown
              onClick={(e:any) => e.stopPropagation() || slider.next()}
              disabled={currentSlide === slider.details().size - 1}
            />
          </>
        )}
        </div>
    </div>
  )
}

interface propsFunction{
  disabled: boolean,
  onClick: React.MouseEventHandler<SVGSVGElement>,
}

function ArrowUp(props:propsFunction) {
  
  const classes = useStyles()
  const disabled = props.disabled
  return (
    <KeyboardArrowUpIcon onClick={props.onClick}
    classes={{root: disabled? classes.arrowDisabled: classes.iconArrowUp}}
    className={classes.arrow}/>
  )
}

function ArrowDown(props:propsFunction) {
  const classes = useStyles()
  const disabled = props.disabled
  return (
  <KeyboardArrowDownIcon onClick={props.onClick}
  classes={{root: disabled? classes.arrowDisabled: classes.iconArrowDown}} 
  className={classes.arrow}/>
  ) 
}

