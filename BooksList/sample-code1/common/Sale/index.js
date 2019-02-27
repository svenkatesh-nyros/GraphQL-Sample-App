import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Icon,Segment } from "semantic-ui-react";
import {styles, styles1,stylesicon } from "./element";
import {ImageItem, WhiteTitle, Paginate} from "../../components";


const CardList = ({ cardData,href, save, heart, active, prev,getData,...props }) =>{
	let data = cardData.length;
	let page_size = 3;
	let indexdata = (active - 1) * page_size;	
	return(
		<div > 
			{cardData.slice(indexdata).slice(0, page_size).map((data, index) =>
				<div  key={index}  style={styles} >
					<Link href={href}><ImageItem fluid source ={data.image} onClick={(e)=>getData?getData(data):e.preventDefault}/></Link>
					{heart[index]?
						<span onClick={e => save(index, e)}><Icon size="big" name='heart' color="red" style={stylesicon}/></span>:
						<span onClick={e => save(index, e)}><Icon size="big" name='heart outline' style={stylesicon}/></span>					
					}
					<Segment basic  style={styles1}>
						<WhiteTitle icon="home" head={data.head} subhead={data.subhead} 
							desc={data.description} 
							floated="left" />
						<WhiteTitle head="1,319" subhead="Sq.Ft" floated="right" 
							style={{borderRight:"1px solid white"}}/>
						<WhiteTitle textAlign="center" head="2" subhead="Baths" floated="right" />
						<WhiteTitle textAlign="center" head="3" subhead="Beds" floated="right" />
					</Segment>
				</div>
			)}
			<Paginate length={data} prev={prev} active={active} {...props}/>
		</div>
	);};
CardList.propTypes = {
	cardData: PropTypes.array.isRequired
};

export default CardList;