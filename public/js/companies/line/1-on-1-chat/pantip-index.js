
var UserGist = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    this.serverRequest = $.get(this.props.source, function (result) {
        var users = JSON.parse(result);
        var items = [];
        for (var i in users) {
            items[i] = users[i];
        }
        this.setState({data: items});
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
     var stationComponents = this.state.data.map(function(data,i) {
        return (
            <tr key={data.mid}>
                <td> {data.displayName} </td>
                <td>{data.statusMessage} </td>
                <td><img src={data.pictureUrl} width="90" height="90" /> </td>
            </tr>
        );
    });
    return (
        <div>
            <table>
                <thead>
                  <tr>
                    <th>displayName</th>
                    <th>statusMessage</th>
                    <th>image</th>
                  </tr>
                </thead>
                <tbody>{stationComponents}</tbody>
            </table>
        </div>
    );
  }
});

/* add Text */
var TodoList = React.createClass({
  render: function() {
    var createItem = function(item) {
      return <p key={item.id}>{item.text}</p>;
    };
    return <div>{this.props.items.map(createItem)}</div>;
  }
});
var TodoApp = React.createClass({
  getInitialState: function() {
    return {items: [], text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  userOnChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([{text: this.state.text, id: Date.now()}]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  handleSubmit2: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([{text: this.state.text2, id: Date.now()}]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  render: function() {
    return (
      <div>
        <h3>Test line-1-on-1-chat</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          OP <input onChange={this.onChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>

        </form>
      </div>
    );
  }
});

var Chat_box = React.createClass({
    render: function() {
        return (
            <div className="col-xs-12">
                <h3>Test line-1-on-1-chat</h3>
            </div>
        );
    }
});

// ReactDOM.render(<Chat_box />, document.getElementById('messageBox'));
// ReactDOM.render(
//   <UserGist source="http://yellowproject.app/api/v1/line-1-on-1-chat" />,
//   document.getElementById('example')
// );


var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Button = ReactBootstrap.Button;

var Panel = ReactBootstrap.Panel;
var Form = ReactBootstrap.Form;
var FormGroup = ReactBootstrap.FormGroup;
var InputGroup = ReactBootstrap.InputGroup;
var FormControl = ReactBootstrap.FormControl;
var ControlLabel = ReactBootstrap.ControlLabel;
var Button = ReactBootstrap.Button;
var Glyphicon = ReactBootstrap.Glyphicon;

var Table = ReactBootstrap.Table;
var thead = ReactBootstrap.thead;
var tbody = ReactBootstrap.tbody;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Well = ReactBootstrap.Well;

var Tab = ReactBootstrap.Tab;
var Tabs = ReactBootstrap.Tabs;
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;

var Media = ReactBootstrap.Media;
var Label = ReactBootstrap.Label;
var Popover = ReactBootstrap.Popover;
var OverlayTrigger = ReactBootstrap.OverlayTrigger;
var Badge = ReactBootstrap.Badge;
var MenuItem = ReactBootstrap.MenuItem;
var Modal = ReactBootstrap.Modal;

var PageHeader = ReactBootstrap.PageHeader;



const Example = React.createClass({
  
  getInitialState() {
    return { showModal: false,showModal2: false, };
  },

  open() {
    this.setState({ showModal: true });
  },
  close() {
    this.setState({ showModal: false });
  },
 

  open2() {
    this.setState({ showModal2: true });
  },
  close2() {
    this.setState({ showModal2: false });
  },
  

  render() {

    var popoverTop = (
      <Popover id="popover-positioned-top">
        <ul className="uploadimg-sticker">

          <MenuItem eventKey="1"> <ControlLabel><FormControl type="file" /></ControlLabel> 
          </MenuItem>
          <MenuItem eventKey="2" onClick={this.open2}>Stickers</MenuItem>
        </ul>
      </Popover>
    );

    var modalEmojis = (
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
          </Modal.Header>

          <Modal.Body>
            <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
              <Tab eventKey={1} title="Emoticon 1">Tab 1 content</Tab>
              <Tab eventKey={2} title="Emoticon 2">Tab 2 content</Tab>
              <Tab eventKey={3} title="Emoticon 3">Tab 3 content</Tab>
            </Tabs>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
    );

    var modalStickers = (
        <Modal show={this.state.showModal2} onHide={this.close2}>
          <Modal.Header closeButton>
          </Modal.Header>

          <Modal.Body>
            <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
              <Tab eventKey={1} title="Sticker 1">Tab 1 content</Tab>
              <Tab eventKey={2} title="Sticker 2">Tab 2 content</Tab>
              <Tab eventKey={3} title="Sticker 3">Tab 3 content</Tab>
            </Tabs>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
    );

    return (
      <Table className="chat-table" responsive>
        <thead>
          <tr>
            <th id="thhead" width="30%">
              <div>
                <FormGroup>
                  <InputGroup>
                    <FormControl type="text" placeholder="" />
                    <InputGroup.Addon>
                      <Glyphicon glyph="search" />
                    </InputGroup.Addon>
                  </InputGroup>
                </FormGroup>
              </div>
              <div className="text-center">
                <FormGroup>
                  <span className="dinline">
                    <FormControl componentClass="select" placeholder="Tag">
                      <option value="Tag">Tag</option>
                      <option value="other">...</option>
                    </FormControl>
                  </span>
                  {' '}
                  <span className="dinline">
                    <FormControl componentClass="select" placeholder="select">
                      <option value="select">select</option>
                      <option value="other">...</option>
                    </FormControl>
                  </span>
                </FormGroup>
              </div>
               <div className="text-center">
                  <span className="dinline">
                    <Button type="submit" className="btn btn-default btns">
                      To reviews
                    </Button>
                  </span>
                  {' '}
                  <span className="dinline">
                    <Button type="submit" className="btn btn-default btns">
                      All
                    </Button>
                  </span>
              </div>
            </th>
            <th className="headchat" width="70%">
              <Row>
                <Col xs={3}>
                  <div className="text-center">
                    <img src={userMoon} alt="user-image" className="img-circle" width="50px" height="50px"/>
                    <div>
                      สมาชิกหมายเลข 989954
                    </div>
                    <div>
                      <span className="text-muted">5 ชั่วโมงที่แล้ว [IP: 125.25.184.235] </span>
                    </div>
                  </div>
                </Col>
                <Col xs={9}>
                  <Row>
                    <Col xs={4}>
                      <div className="text-center">
                        <InputGroup>
                          <InputGroup.Addon><Glyphicon glyph="earphone" /></InputGroup.Addon>
                          <FormControl type="text" />
                        </InputGroup>
                      </div>
                    </Col>
                    <Col xs={4}>
                      <div className="text-center">
                        <InputGroup>
                          <InputGroup.Addon><i className="fa fa-envelope" aria-hidden="true"></i></InputGroup.Addon>
                          <FormControl type="text" />
                        </InputGroup>
                      </div>
                    </Col>
                    <Col xs={4}>
                      <div className="text-center">
                        <InputGroup>
                          <InputGroup.Addon><i className="fa fa-file-text" aria-hidden="true"></i></InputGroup.Addon>
                          <FormControl type="text" />
                        </InputGroup>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <div className="pull-right networkgroup-btn">
                        <ButtonToolbar>
                          <Button href="#">Internet</Button>
                          <Button>LAN</Button>
                          <Button>Network</Button>
                        </ButtonToolbar>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </th>
            
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="list-people">
              <div id="left">
                <div className="friend-list">
                  <Col xs={12} >
                    <h4 className="heading-list">Windows 10 แท้ใช้กับ Office เถื่อนจะมีปัญหามั้ยครับ?</h4>
                    <div className="text-muted pull-left">mk096 - 1 ชั่วโมงที่แล้ว 4</div>
                    <div className="text-muted pull-right connect-text ">#คอมพิวเตอร์</div>
                  </Col>
                </div>

                <div className="friend-list">
                  <Col xs={12} >
                    <h4 className="heading-list">Board รุ่น GA H255M-S2V เพิ่ม Ram เป็น 8 GB ไม่ได้เพราะ sockey 1156 จริงหรอครับ</h4>
                    <div className="text-muted pull-left">สมาชิกหมายเลข 989999 - 3 ชั่วโมงที่แล้ว 2</div>
                    <div className="text-muted pull-right connect-text">#ชิ้นส่วนคอมพิวเตอร์</div>
                  </Col>
                </div>

                <div className="friend-list">
                  <Col xs={12} >
                    <h4 className="heading-list">Local Area Connecttion หายอีกแล้วค่ะ !?</h4>
                    <div className="text-muted pull-left">สมาชิกหมายเลข 989954 - 4 ชั่วโมงที่แล้ว 5</div>
                    <div className="text-muted pull-right connect-text">#อินเตอร์เน็ต LAN Network</div>
                  </Col>
                </div>

                <div className="friend-list">
                  <Col xs={12} >
                    <h4 className="heading-list">Windows 10 แท้ใช้กับ Office เถื่อนจะมีปัญหามั้ยครับ?</h4>
                    <div className="text-muted pull-left">mk096 - 1 ชั่วโมงที่แล้ว 4</div>
                    <div className="text-muted pull-right connect-text">#คอมพิวเตอร์</div>
                  </Col>
                </div>

                <div className="friend-list">
                  <Col xs={12} >
                    <h4 className="heading-list">Board รุ่น GA H255M-S2V เพิ่ม Ram เป็น 8 GB ไม่ได้เพราะ sockey 1156 จริงหรอครับ</h4>
                    <div className="text-muted pull-left">สมาชิกหมายเลข 989999 - 3 ชั่วโมงที่แล้ว 2</div>
                    <div className="text-muted pull-right connect-text">#ชิ้นส่วนคอมพิวเตอร์</div>
                  </Col>
                </div>

                <div className="friend-list">
                  <Col xs={12} >
                    <h4 className="heading-list">Local Area Connecttion หายอีกแล้วค่ะ !?</h4>
                    <div className="text-muted pull-left">สมาชิกหมายเลข 989954 - 4 ชั่วโมงที่แล้ว 5</div>
                    <div className="text-muted pull-right connect-text">#อินเตอร์เน็ต LAN Network</div>
                  </Col>
                </div>

              </div>
            </td>


            <td className="onchat">
              <Col xs={12} className="text-center">
                <p>
                  <Badge>8, 08 (Monday)</Badge>
                </p>
              </Col>

              <Col xs={12} >
                <Well bsSize="large" className="display-post-wrapper"><h2 className="display-post-title">[CR] รีวิว แบกเป้เที่ยวเมืองกาญด้วยงบ 1,700 บาท ที่ The For Rest Resort</h2></Well>
              </Col>

              <Col xs={12} >
                <Well bsSize="large" className="display-post-wrapper-inner">
                  <span className="display-post-number">ความคิดเห็นที่ 1</span>
                  <div className="display-post-story">ตามไปเที่ยวด้วยจ้า  จะไปเสาร์นี้เหมือนกัน แต่คงพักตัวเมือง อิอิ</div>
                </Well>
              </Col>

              <Col xs={12}>
                <div className="display-post-status-leftside">
                  <Well bsSize="large" className="display-post-wrapper-inner-answercomment">
                    <span className="display-post-number">ความคิดเห็นที่ 1-1</span>
                    <div className="display-post-story">มาเที่ยวด้วยกันน้าา เที่ยวให้สนุกนะคะ</div>
                  </Well>
                </div>
              </Col>

              <Col xs={12} >
                <Well bsSize="large" className="display-post-wrapper-inner">
                  <span className="display-post-number">ความคิดเห็นที่ 2</span>
                  <div className="display-post-story">ตามไปเที่ยวด้วยจ้า  จะไปเสาร์นี้เหมือนกัน แต่คงพักตัวเมือง อิอิ</div>
                </Well>
              </Col>

              <Col xs={12}>
                <div className="display-post-status-leftside">
                  <Well bsSize="large" className="display-post-wrapper-inner-answercomment">
                    <span className="display-post-number">ความคิดเห็นที่ 2-1</span>
                    <div className="display-post-story">มาเที่ยวด้วยกันน้าา เที่ยวให้สนุกนะคะ</div>
                  </Well>
                </div>
              </Col>

            </td>
          </tr>
          <tr>
            <td className="no-border">
            </td>
            <td className="relative">
              <div className="onkeypress">
                <div>
                  <InputGroup>
                    <InputGroup.Button>
                      <OverlayTrigger trigger="click" placement="top" overlay={popoverTop}>
                        <Button><Glyphicon glyph="plus" /></Button>
                      </OverlayTrigger>
                    </InputGroup.Button>
                    <InputGroup.Button >
                      <Button  onClick={this.open} className="noredius"><i className="fa fa-meh-o" aria-hidden="true"></i></Button>
                    </InputGroup.Button>
                    <FormControl type="text" />
                    <InputGroup.Button>
                      <Button bsStyle="primary">Send</Button>
                    </InputGroup.Button>
                  </InputGroup>
                </div>
                <div className="newStatus-wrapper">
                  <div className="newPost">
                    <div>
                      <ul className="list-key">
                        <li>
                          <span><i className="fa fa-camera-retro" aria-hidden="true"></i></span>
                        </li>
                        <li>
                          <span><i className="fa fa-youtube-play" aria-hidden="true"></i></span>
                        </li>
                        <li>
                          <span><i className="fa fa-map-marker" aria-hidden="true"></i></span>
                        </li>
                        <li>
                          <span><i className="fa fa-smile-o" aria-hidden="true"></i></span>
                        </li>
                        <li>
                          <span><i className="fa fa-bold" aria-hidden="true"></i></span>
                        </li>
                        <li>
                          <span><i className="fa fa-italic" aria-hidden="true"></i></span>
                        </li>
                        <li>
                          <span><i className="fa fa-underline" aria-hidden="true"></i></span>
                        </li>
                        <li>
                          <span><i className="fa fa-strikethrough" aria-hidden="true"></i></span>
                        </li>
                        <li>
                          <span><i className="fa fa-align-left" aria-hidden="true"></i></span>
                        </li>
                        <li>
                          <span><i className="fa fa-align-center" aria-hidden="true"></i></span>
                        </li>
                        <li>
                          <span><i className="fa fa-align-right" aria-hidden="true"></i></span>
                        </li>
                        <li>
                          <span><i className="fa fa-link" aria-hidden="true"></i></span>
                        </li>
                        <li>
                          <span><i className="fa fa-superscript" aria-hidden="true"></i></span>
                        </li>
                        <li>
                          <span><i className="fa fa-subscript" aria-hidden="true"></i></span>
                        </li>
                        <li> 
                          <div>[Spoil]</div>
                        </li>
                      </ul>
                    </div>
                    <div className="text-right">
                        <span className="newPost-btn">ตั้งกระทู้ {' '}<i className="fa fa-plus" aria-hidden="true"></i></span>
                    </div>
                  </div>
                </div>
              </div>
              
            </td>
          </tr>
        </tbody>

        {modalEmojis}
        {modalStickers}
      </Table>

    );
  }
});

ReactDOM.render(<Example/>, document.getElementById('tablePantip'));
