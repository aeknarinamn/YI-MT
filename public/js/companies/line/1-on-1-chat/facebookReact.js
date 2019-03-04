
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

var Hello= React.createClass({
    render: function() {
        return (
            <div className="col-xs-12">
                <h3>Test line-1-on-1-chat-facebook</h3>
            </div>
        );
    }
});

ReactDOM.render(<Hello />, document.getElementById('messageBox'));
// ReactDOM.render(
//   <UserGist source="http://yellowproject.app/api/v1/line-1-on-1-chat" />,
//   document.getElementById('example')
// );

