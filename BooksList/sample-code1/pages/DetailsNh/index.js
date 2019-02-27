import React, {Component} from 'react';
import Layout from '../../container';
import Router from 'next/router';
import {Divider, Grid, Icon, Label} from 'semantic-ui-react';
import {
  ButtonItem,
  Gallery,
  InText,
  LoginModal,
  MapContainer,
  Segmant,
  SignupModal,
  Title,
  Wcomment
} from '../../components';
import {CardList, CommentList, Description, IconsGrid, ItemsList} from '../../common';
import {cardData, commData, desData, homeData, iconData, imageData, itemData,} from './data.json';


class DetailsNh extends Component {
  constructor() {
    super();
    this.state = {
      display: true,
      reply: {},
      ques: false,
      comment: {},
      loggedin: false,
      save: false,
      data: {},
      activePage: 1,
      activePage1: 1,
      activePage2: 1,
      id: '',
      onquestion: '',
      onreply: '',
      oncomment: '',
      smodal: false,
      lmodal: false,
      heart: {},
      like: {},
      rlike: {},
      qlike: {},
      staticData: {
        name: 'ALDER MANOR, San Carlos, CA', npi: 'NPI: 901 (#3 in San Carlos, #10 in the area)',
        vi: 'Value Index: 1.15 (Great Value)'
      },
      replies: {}, commentData: commData
    };
  }

  componentDidMount() {
    let data = JSON.stringify(commData);
    localStorage.setItem('commData', data);
  }

  onComment = index => {
    const {loggedin} = this.state;
    if (loggedin) {
      let {comment} = this.state;
      comment[index] = !comment[index];
      this.setState({comment});
    } else {
      this.setState({smodal: true});
    }
  };

  onReply = index => {
    let {loggedin} = this.state;
    if (loggedin) {
      let {reply} = this.state;
      reply[index] = !reply[index];
      this.setState({reply});
    } else {
      this.setState({smodal: true});
    }
  }
  onSaveNeighbor = (e) => {
    const {loggedin} = this.state;
    loggedin ? this.setState({save: !this.state.save}) : this.setState({smodal: true, save1: true});

  };

  onShow = index => {
    let {data} = this.state;
    data[index] = !data[index];
    this.setState({data});
  };

  togglePrev = (e, {value}, id) => {
    let condition1 = id.id === 'neighborhoods';
    let condition2 = id.id === 'agents';
    let condition3 = id.id === 'sale';
    // activePage= value.activePage;
    condition1 ?
      this.setState({activePage: value.activePage}) :
      condition2 ?
        this.setState({activePage1: value.activePage}) : condition3 ?
          this.setState({activePage2: value.activePage}) : null;
  };

  askQues = (e) => {
    this.setState({[e.target.name]: [e.target.value]});
  };

  onSubmit = (e) => {
    let data = JSON.parse(localStorage.getItem('commData'));
    data.push({questions: {data: 'Question', answer: this.state.onquestion[0], date: '2 days'}});
    this.setState({commentData: data},
      () => {
        localStorage.setItem('commData', JSON.stringify(data));
      });
    this.setState({onquestion: ''});
  }

  onQuestions = e => {
    this.setState({ques: !this.state.ques});
  }
  modalSubmit = (values) => {
    let id = values.id;
    id === 'smodal' ?
      Router.push('/signup') :
      id === 'lmodal' ? this.setState({lmodal: false, loggedin: true}, () => {
      }) : null;

  }


  nextModal = (e) => {
    let id = (e.target.id);
    id === 'smodal' ?
      this.setState({smodal: false, lmodal: true}) :
      this.setState({smodal: true, lmodal: false});
  }

  onIcon = () => {
    this.setState({smodal: false, lmodal: false});
  }

  onSaveHeart = index => {
    let {loggedin} = this.state;
    if (loggedin) {
      let {heart} = this.state;
      heart[index] = !heart[index];
      this.setState({heart});
    } else
      this.setState({smodal: true});
  }

  onLike = (index, e) => {
    let {loggedin} = this.state;
    if (loggedin) {
      let name = e.target.name;
      let {like, qlike, rlike} = this.state;
      if (name === 'desc') {
        like[index] = !like[index];
        this.setState({like});
      } else if (name === 'ques') {
        qlike[index] = !qlike[index];
        this.setState({qlike});
      } else if (name === 'rply') {
        rlike[index] = !rlike[index];
        this.setState({rlike});
      } else
        console.log('not likeds');
    } else
      this.setState({smodal: true});
  }

  onGet = (e, name) => {
    let staticData = this.state;
    staticData.name = name;
    this.setState({staticData});
  }

  onReview = (e) => {
    Router.push('/Review');
  }

  onReplies = (e, index) => {
    let {replies} = this.state;
    replies[index] = !replies[index];
    this.setState({replies});
  }

  render() {
    let {
      reply, data, comment, save, activePage, activePage1, smodal, lmodal, heart, onreply
      , activePage2, staticData, ques, like, replies, commentData, onquestion, qlike, rlike
    } = this.state;
    return (
      <Layout search={true}>
        <Grid divided>
          <Grid.Row>
            <Grid.Column width={10}>
              <Segmant>
                <Title name={staticData.name} size="medium"/>
                <InText name={staticData.npi}/>
                <InText name={staticData.vi}/>
              </Segmant>
              <Segmant>
                <IconsGrid gridData={iconData}/>
              </Segmant>
              <Segmant>
                <Title name="Key Words:" size="small" floated="left"/>
                <InText
                  name='"Family friendly" "Wonderful local park" "Great place to raise kids"'
                  size="small"
                  floated="left"
                />
              </Segmant>
              <Segmant>
                <Title name="Summaries:" size="small"/>
                <InText
                  name="Alder Manor is one of the best nieghborhoods in San Carlos. It has tree lined streets and the traffic
								is never so fast. In a normal weekend day, you will see lots of kids playing around on their driveways
								and moms pushing strollers around. So, if you have a young family you will be hardpressed to find a
								better neighborhood."
                  size="small"
                />
              </Segmant>
              <Gallery imageData={imageData}/>
              <Segmant>
                {save ? (
                  <ButtonItem
                    as="div"
                    labelPosition="right"
                    floated="right"
                    // onClick={this.onSaveNeighbor}
                  >
                    <ButtonItem color="green" icon="check"/>
                    <Label
                      as="a"
                      content="Saved"
                      basic
                      color="green"
                      pointing="left"
                    />
                  </ButtonItem>
                ) : (
                  <ButtonItem
                    as="div"
                    labelPosition="right"
                    floated="right"
                    onClick={this.onSaveNeighbor}
                  >
                    <ButtonItem color="red" icon="heart"/>
                    <Label
                      as="a"
                      name="saveNeighbor"
                      content="Save this DetailsNh"
                      basic
                      color="red"
                      pointing="left"
                    />
                  </ButtonItem>
                )}
              </Segmant>
              <Divider style={{margin: '40px 0 0 0'}}/>
              <Description
                desData={desData}
                display={data}
                show={this.onShow}
                visibility={comment}
                toggle={this.onComment}
                change={this.askQues}
                like={like}
                onLike={this.onLike}
                review={this.onReview}
              />
              <Segmant>
                <Title
                  name="Questions about this Neighborhood"
                  size="medium"
                  floated="left"
                />
              </Segmant>
              <Segmant>
                <CommentList
                  name="reply"
                  commentData={commentData}
                  visibility={reply}
                  toggle={this.onReply}
                  display={ques}
                  click={this.onQuestions}
                  change={this.askQues}
                  show={replies}
                  replies={this.onReplies}
                  queslike={qlike}
                  rplylike={rlike}
                  onLike={this.onLike}
                  changeval={this.askQues}
                  submit={this.onSubmit}
                  value={onreply}
                />
              </Segmant>
              <Segmant>
                <ButtonItem size="small" color="red" icon labelPosition="right">
                  Ask a Question
                  <Icon name="question"/>
                </ButtonItem>
                <Wcomment name="onquestion" form="question" visibility={true} changeval={this.askQues}
                  submit={this.onSubmit} value={onquestion}/>
              </Segmant>
              <Segmant>
                <Divider/>
                <Title name="Neighborhood Map" size="medium"/>
                <MapContainer/>
              </Segmant>
            </Grid.Column>
            <Grid.Column width={6}>
              <Segmant>
                <Title name="Neighborhood Map" size="medium"/>
                <MapContainer/>
              </Segmant>
              <Segmant textAlign="left">
                <Title name="Similar DetailsNh" size="medium"/>
                <ItemsList
                  id="neighborhoods"
                  itemData={homeData}
                  getData={this.onGet}
                  prev={this.togglePrev}
                  active={activePage}
                  href="/DetailsNh"/>
              </Segmant>
              <Segmant>
                <Title name="Top Agents for this Neighborhood" size="medium"/>
                <ItemsList
                  id="agents"
                  itemData={itemData}
                  href="/ProfileRealtor"
                  prev={this.togglePrev}
                  active={activePage1}
                />
              </Segmant>
              <Segmant>
                <Title
                  name="Homes for Sale in this Neighborhood"
                  size="medium"
                />
                <CardList
                  id="sale"
                  save={this.onSaveHeart}
                  heart={heart}
                  cardData={cardData}
                  href="DetailsListing"
                  prev={this.togglePrev}
                  active={activePage2}/>
              </Segmant>
              <Segmant>
                <LoginModal open={lmodal}
                  submit={this.modalSubmit}
                  next={this.nextModal}
                  iconclick={this.onIcon}
                />
                <SignupModal open={smodal}
                  submit={this.modalSubmit}
                  next={this.nextModal}
                  iconclick={this.onIcon}
                />
              </Segmant>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default DetailsNh;
