var token = "";
var userId = "";
var accessToken = {} ;
var fanpageDatas = {};
var chatUserDatas = {};
var loginProfile = {};

window.fbAsyncInit = function() {
    FB.init({
        appId: '1529693500389649', //'259763817525266',
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true  // parse XFBML
    });
    FB.Event.subscribe('auth.authResponseChange', function(response){
        console.log(response);
        //logout-unauthen
        if (response.authResponse == null | response.status == "unknow") {
            return;
        }
        token = response.authResponse.accessToken;
        userId = response.authResponse.userID;
        console.log("token:::" + token);
        console.log("userID::" + userId);

        if (response.status === 'connected') {
            enableAPI();
            // FB.api("/me/permissions", function (response) {
            //     console.log("My Permissions: ", response);
            // });
        } else if (response.status === 'not_authorized') {
            FB.login(function() { scope: 'public_profile,publish_actions,publish_pages,manage_pages,read_page_mailboxes'});
        } else {
            FB.login(function() { scope: 'public_profile,publish_actions,publish_pages,manage_pages,read_page_mailboxes'});
        }
    });
};

// Load the SDK asynchronously
(function(d) {
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) { console.log(7); return; }
    js = d.createElement('script');
    js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
} (document));

function enableAPI()
{
    console.log('Welcome!  Fetching your information.... ');
    getLoginProfile();
    connectFanpage();
}

var loginProfile = {};
function getLoginProfile()
{
    FB.api('/me', function(response) {
        console.log(response);
        loginProfile = response;
    });
    FB.api("/me/permissions", function (response) {
        console.log("My Permissions: ", response);
    });
}
function connectFanpage()
{
    // dataSets = {
    //     fields : 'cover',
    // }
    FB.api('/me/accounts',
        function(response) {
            console.log("----------------Fanpage------------------");
            $.each( response['data'], function( key, fanpage ) {
                var fanpageName = fanpage['name'];
                var fanpageId = fanpage['id'];
                var emptyFanpagePhoto = 'http://3.bp.blogspot.com/-5C3tgIpCkHo/VTnR3xce82I/AAAAAAAABQ8/MMfWH-IrIlQ/s1600/Ho%2Bto%2BConvert%2BFacebook%2BProfile%2Bto%2BPage.png';
                FB.api('/'+fanpageId+'/photos', function(response) {
                    if(!response['data'][0]) {
                        fanpageDatas[fanpageId] = {
                          'name':fanpageName,
                          'imgUrl':emptyFanpagePhoto
                        };
                        // var imgHtml = '<img src="'+emptyFanpagePhoto+'" class="img-circle" alt="" width="65" height="65"><label>'+fanpageName+'</label>'+'<a class="btn btn-primary" href="javascript:showUserInbox('+fanpageId+')"" role="button"></i>Add</a>'+'<br/>';
                        // $('#showFanpage').append(imgHtml);
                    } else {
                        var fanpagePhotoId = response['data'][0]['id'];
                        FB.api('/'+fanpagePhotoId,'get',{fields : 'picture'},function(response) {
                          // console.log(response['picture']);
                          fanpageDatas[fanpageId] = {
                            'name':fanpageName,
                            'imgUrl':response.picture
                          };
                          // console.log(fanpageDatas);
                          // console.log(fanpageDatas[fanpageId]['imgUrl']);
                          // var imgHtml = '<img src="'+response['picture']+'" class="img-circle" alt="" width="65" height="65"><label>'+fanpageName+'</label>'+'<a class="btn btn-primary" href="javascript:showUserInbox('+fanpageId+')"" role="button"></i>Add</a>'+'<br/>';
                          // $('#showFanpage').append(imgHtml);
                        });
                    }
                });
                accessToken[fanpageId] = fanpage['access_token'];
                showUserInbox(fanpageId);
            });
            // console.log(response);
            // console.log(response['data'][0]);
        });
}
function showUserInbox(fanpageId)
{
    var pageTokenId = accessToken[fanpageId];
    FB.api('/'+fanpageId+'/conversations','get',{access_token: pageTokenId},function(response) {
        console.log("----------------Message Fanpage------------------");
        $.each( response.data, function( key, fanpageMessages ) {
            // console.log(fanpageMessages['id']);
            getUserProfileFromMessageFanPage(fanpageId,fanpageMessages['id']);
        });
        // console.log(chatUserDatas);
        // this.setState({chatUserDatas: chatUserDatas});
    });
}
function getUserProfileFromMessageFanPage(fanpageId,conversationId)
{
    var pageTokenId = accessToken[fanpageId];
    FB.api(
        '/'+conversationId,
        'get',
        {
            fields: 'senders',
            access_token: pageTokenId,
        },
        function(response) {
          var userName = response['senders']['data'][0]['name'];
          var userId = response['senders']['data'][0]['id'];
          FB.api("/"+userId+"/picture",'get',{type: 'normal'},function (response) {
            var imgUrl = response.data.url;
            // chatUserDatas[fanpageId] = {
            //   conversationId:{
            //     name:userName,
            //     imgUrl:imgUrl,
            //   },
            // };
            chatUserDatas[conversationId] = {
              name:userName,
              imgUrl:imgUrl,
            };
          });
    });
    // console.log(chatUserDatas);
}

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
    // this.setState({ data: chatUserDatas });
    // console.log(this.setState.data);
    return { showModal: false,showModal2: false, };
  },

  // kuy: function() {
  //   window.fbAsyncInit = function() {
  //       FB.init({
  //           appId: '1529693500389649', //'259763817525266',
  //           status: true, // check login status
  //           cookie: true, // enable cookies to allow the server to access the session
  //           xfbml: true  // parse XFBML
  //       });
  //       FB.Event.subscribe('auth.authResponseChange', function(response){
  //           console.log(response);
  //           //logout-unauthen
  //           if (response.authResponse == null | response.status == "unknow") {
  //               return;
  //           }
  //           token = response.authResponse.accessToken;
  //           userId = response.authResponse.userID;
  //           console.log("token:::" + token);
  //           console.log("userID::" + userId);

  //           if (response.status === 'connected') {
  //               // enableAPI();
  //               this.getLoginProfile();
  //               // FB.api("/me/permissions", function (response) {
  //               //     console.log("My Permissions: ", response);
  //               // });
  //           } else if (response.status === 'not_authorized') {
  //               FB.login(function() { scope: 'public_profile,publish_actions,publish_pages,manage_pages,read_page_mailboxes'});
  //           } else {
  //               FB.login(function() { scope: 'public_profile,publish_actions,publish_pages,manage_pages,read_page_mailboxes'});
  //           }
  //       });
  //   };

  //   // Load the SDK asynchronously
  //   (function(d) {
  //       var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
  //       if (d.getElementById(id)) { console.log(7); return; }
  //       js = d.createElement('script');
  //       js.id = id; js.async = true;
  //       js.src = "//connect.facebook.net/en_US/all.js";
  //       ref.parentNode.insertBefore(js, ref);
  //   } (document));

  // },

  // getLoginProfile: function () {
  //     FB.api('/me', function(response) {
  //         console.log(response);
  //         // loginProfile = response;
  //     });
  //     FB.api("/me/permissions", function (response) {
  //         console.log("My Permissions: ", response);
  //     });
  // },

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
                { this.state.data.map(function(data) {
                        return (
                          <div className="friend-list">
                            <Col xs={9} >
                              <Media>
                                <Media.Left align="middle">
                                  <img className="img-circle" width={50} height={50} src={data.imgUrl} alt="Image"/>
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
                        );
                    })
                }
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
                  <div className="self-msg bg-fb">
                    <p className="text-self">
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
                  <div className="self-msg bg-fb">
                    <p className="text-self">
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
                  <div className="self-msg bg-fb">
                    <p className="text-self">
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

ReactDOM.render(<Example/>, document.getElementById('tableFacebook'));
