
/*

 var ProductCategoryRow = React.createClass({
  render: function() {
    return (<tr><th colSpan="2">{this.props.category}</th></tr>);
  }
});

var ProductRow = React.createClass({
  render: function() {
    var displayName = this.props.product.stocked ?
      this.props.product.displayName :
      <span style={{color: 'red'}}>
        {this.props.product.displayName}
      </span>;
    return (
      <tr>
        <td>{displayName}</td>
        <td>{this.props.product.statusMessage}</td>
        <td> <img src={this.props.product.pictureUrl} width='150px' height='150px' /></td>

      </tr>
    );
  }
});

var ProductTable = React.createClass({
  render: function() {
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach(function(product) {
      // if (product.category !== lastCategory) {
      //   rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      // }
      rows.push(<ProductRow product={product} key={product.displayName} />);
      lastCategory = product.category;
    });
    return (
      <table>
        <thead>
          <tr>
            <th>displayName</th>
            <th>statusMessage</th>
            <th>image</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});


var FilterableProductTable = React.createClass({
  render: function() {
    return (
      <div>
        <ProductTable products={this.props.products} />
      </div>
    );
  }
});


var USERS = [
  {category: 'Women', pictureUrl:'http://dl.profile.line-cdn.net/0m00b7ee3f72514fd3f0c315f86cd8480aa6200d8d4ab7', statusMessage: 'Na Na Navillera', displayName: 'Ayutama'},
  {category: 'Men', pictureUrl:'http://dl.profile.line-cdn.net/0m001aefbb7251fa0addda91e51bf8bcae7f1d8d5360fb', statusMessage: 'มีแต่คำถาม คำถามเต็มหัวไปหมด(?)(?)(?)(?)(?)(?)', displayName: 'ICEkung'},
];

ReactDOM.render(
  <FilterableProductTable products={USERS} />,
  document.getElementById('example2')
);

*/


// class LikeButton extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       liked: false
//     };
//     this.handleClick = this.handleClick.bind(this);
//   }
//   handleClick() {
//     this.setState({liked: !this.state.liked});
//   }
//   render() {
//     const text = this.state.liked ? 'liked' : 'haven\'t liked';
//     return (
//       <button onClick={this.handleClick}>
//         You {text} this. Click to toggle.
//       </button>
//     );
//   }
// }

// ReactDOM.render(
//   <LikeButton />,
//   document.getElementById('example')
// );
// 


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
                      Avatar User
                    </div>
                  </div>
                </Col>
                <Col xs={3}>
                  <div className="text-center">
                    <InputGroup>
                      <InputGroup.Addon><Glyphicon glyph="earphone" /></InputGroup.Addon>
                      <FormControl type="text" />
                    </InputGroup>
                  </div>
                </Col>
                <Col xs={3}>
                  <div className="text-center">
                    <InputGroup>
                      <InputGroup.Addon><i className="fa fa-envelope" aria-hidden="true"></i></InputGroup.Addon>
                      <FormControl type="text" />
                    </InputGroup>
                  </div>
                </Col>
                <Col xs={3}>
                  <div className="text-center">
                    <InputGroup>
                      <InputGroup.Addon><i className="fa fa-file-text" aria-hidden="true"></i></InputGroup.Addon>
                      <FormControl type="text" />
                    </InputGroup>
                  </div>
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
                  <Col xs={9} >
                    <Media>
                      <Media.Left align="middle">
                        <img className="img-circle" width={50} height={50} src={userMoon} alt="Image"/>
                      </Media.Left>
                      <Media.Body>
                        <Media.Heading>Avatar User</Media.Heading>
                        <div className="text-muted">Cras sit amet nibh libero.</div>
                      </Media.Body>
                    </Media>
                  </Col>
                  <Col xs={3} >
                    <div className="text-right">
                      <div className="text-muted">9.00 AM</div>
                    </div>
                  </Col>
                </div>
                <div className="friend-list">
                  <Col xs={9} >
                    <Media>
                      <Media.Left align="middle">
                        <img className="img-circle" width={50} height={50} src={userMoon} alt="Image"/>
                      </Media.Left>
                      <Media.Body>
                        <Media.Heading>Avatar User</Media.Heading>
                        <div className="text-muted">Cras sit amet nibh libero.</div>
                      </Media.Body>
                    </Media>
                  </Col>
                  <Col xs={3} >
                    <div className="text-right">
                      <div className="text-muted">9.00 AM</div>
                    </div>
                  </Col>
                </div>
                <div className="friend-list">
                  <Col xs={9} >
                    <Media>
                      <Media.Left align="middle">
                        <img className="img-circle" width={50} height={50} src={userMoon} alt="Image"/>
                      </Media.Left>
                      <Media.Body>
                        <Media.Heading>Avatar User</Media.Heading>
                        <div className="text-muted">Cras sit amet nibh libero.</div>
                      </Media.Body>
                    </Media>
                  </Col>
                  <Col xs={3} >
                    <div className="text-right">
                      <div className="text-muted">9.00 AM</div>
                    </div>
                  </Col>
                </div>
                <div className="friend-list">
                  <Col xs={9} >
                    <Media>
                      <Media.Left align="middle">
                        <img className="img-circle" width={50} height={50} src={userMoon} alt="Image"/>
                      </Media.Left>
                      <Media.Body>
                        <Media.Heading>Avatar User</Media.Heading>
                        <div className="text-muted">Cras sit amet nibh libero.</div>
                      </Media.Body>
                    </Media>
                  </Col>
                  <Col xs={3} >
                    <div className="text-right">
                      <div className="text-muted">9.00 AM</div>
                    </div>
                  </Col>
                </div>
                <div className="friend-list">
                  <Col xs={9} >
                    <Media>
                      <Media.Left align="middle">
                        <img className="img-circle" width={50} height={50} src={userMoon} alt="Image"/>
                      </Media.Left>
                      <Media.Body>
                        <Media.Heading>Avatar User</Media.Heading>
                        <div className="text-muted">Cras sit amet nibh libero.</div>
                      </Media.Body>
                    </Media>
                  </Col>
                  <Col xs={3} >
                    <div className="text-right">
                      <div className="text-muted">9.00 AM</div>
                    </div>
                  </Col>
                </div>
                <div className="friend-list">
                  <Col xs={9} >
                    <Media>
                      <Media.Left align="middle">
                        <img className="img-circle" width={50} height={50} src={userMoon} alt="Image"/>
                      </Media.Left>
                      <Media.Body>
                        <Media.Heading>Avatar User</Media.Heading>
                        <div className="text-muted">Cras sit amet nibh libero.</div>
                      </Media.Body>
                    </Media>
                  </Col>
                  <Col xs={3} >
                    <div className="text-right">
                      <div className="text-muted">9.00 AM</div>
                    </div>
                  </Col>
                </div>
                <div className="friend-list">
                  <Col xs={9} >
                    <Media>
                      <Media.Left align="middle">
                        <img className="img-circle" width={50} height={50} src={userMoon} alt="Image"/>
                      </Media.Left>
                      <Media.Body>
                        <Media.Heading>Avatar User</Media.Heading>
                        <div className="text-muted">Cras sit amet nibh libero.</div>
                      </Media.Body>
                    </Media>
                  </Col>
                  <Col xs={3} >
                    <div className="text-right">
                      <div className="text-muted">9.00 AM</div>
                    </div>
                  </Col>
                </div>
                <div className="friend-list">
                  <Col xs={9} >
                    <Media>
                      <Media.Left align="middle">
                        <img className="img-circle" width={50} height={50} src={userMoon} alt="Image"/>
                      </Media.Left>
                      <Media.Body>
                        <Media.Heading>Avatar User</Media.Heading>
                        <div className="text-muted">Cras sit amet nibh libero.</div>
                      </Media.Body>
                    </Media>
                  </Col>
                  <Col xs={3} >
                    <div className="text-right">
                      <div className="text-muted">9.00 AM</div>
                    </div>
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
                <span className="pull-left">
                  <img className="img-circle" width={50} height={50} src={userMoon} alt="Image"/>
                </span>
                <span className="user-msg pull-left">
                  <div className="msg">
                    <p>
                      Hola! <br />
                      Te vienes a cenar al centro? Cras sit amet nibh libero. Cras sit amet nibh libero.Cras sit amet nibh libero. Cras sit amet nibh libero. Cras sit amet nibh libero. 
                    </p>
                  </div>
                </span>
                <span className="timeread pull-left">
                  <div><time> 20:19</time></div>
                </span>
              </Col>
              <Col xs={12} >
                <span className="pull-right">
                  <div className="self-msg">
                    <p>
                      Hola!
                      <br />
                      Te vienes a cenar al centro?
                    </p>
                  </div>
                </span>
                <span className="timeread pull-right">
                  <div><time> 20:19</time></div>
                </span>
              </Col>

              <Col xs={12} >
                <span className="pull-left">
                  <img className="img-circle" width={50} height={50} src={userMoon} alt="Image"/>
                </span>
                <span className="user-msg pull-left">
                  <div className="msg">
                    <p>
                      Hola! <br />
                      Te vienes a cenar al centro? Cras sit amet nibh libero. Cras sit amet nibh libero.Cras sit amet nibh libero. Cras sit amet nibh libero. Cras sit amet nibh libero. 
                    </p>
                  </div>
                </span>
                <span className="timeread pull-left">
                  <div><time> 20:19</time></div>
                </span>
              </Col>
              <Col xs={12} >
                <span className="pull-right">
                  <div className="self-msg">
                    <p>
                      Hola!
                      <br />
                      Te vienes a cenar al centro?
                    </p>
                  </div>
                </span>
                <span className="timeread pull-right">
                  <div><time> 20:19</time></div>
                </span>
              </Col>

              <Col xs={12} >
                <span className="pull-left">
                  <img className="img-circle" width={50} height={50} src={userMoon} alt="Image"/>
                </span>
                <span className="user-msg pull-left">
                  <div className="msg">
                    <p>
                      Hola! <br />
                      Te vienes a cenar al centro? Cras sit amet nibh libero. Cras sit amet nibh libero.Cras sit amet nibh libero. Cras sit amet nibh libero. Cras sit amet nibh libero. 
                    </p>
                  </div>
                </span>
                <span className="timeread pull-left">
                  <div><time> 20:19</time></div>
                </span>
              </Col>
              <Col xs={12} >
                <span className="pull-right">
                  <div className="self-msg">
                    <p>
                      Hola!
                      <br />
                      Te vienes a cenar al centro?
                    </p>
                  </div>
                </span>
                <span className="timeread pull-right">
                  <div><time> 20:19</time></div>
                </span>
              </Col>
            </td>
          </tr>
          <tr>
            <td className="no-border">
            </td>
            <td className="relative">
              <div className="onkeypress">
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
            </td>
          </tr>
        </tbody>

        {modalEmojis}
        {modalStickers}
      </Table>

    );
  }
});

ReactDOM.render(<Example/>, document.getElementById('heading_table'));
