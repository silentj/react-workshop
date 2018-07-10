////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Create a chat application using the utility methods we give you
//
// Need some ideas?
//
// - Cause the message list to automatically scroll as new messages come in
// - Highlight messages from you to make them easy to find
// - Highlight messages that mention you by your GitHub username
// - Group subsequent messages from the same sender
// - Create a filter that lets you filter messages in the chat by
//   sender and/or content
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import {render} from "react-dom";
import {sendMessage, subscribeToMessages} from "./utils";
import serializeForm from "form-serialize";

/*
Here's how to use the utils:

login(user => {
  // do something with the user object
})

sendMessage({
  userId: user.id,
  photoURL: user.photoURL,
  text: 'hello, this is a message'
})

const unsubscribe = subscribeToMessages(messages => {
  // here are your messages as an array, it will be called
  // every time the messages change
})

unsubscribe() // stop listening for new messages

The world is your oyster!
*/

const AUTOSCROLL_BUFFER = 20;

class AutoScroller extends React.Component {

  // This is _not_ state. MJ suggested it shouldn't be.
  shouldAutoscroll = true;

  onScroll = (event) => {
      const node = event.target;
      this.shouldAutoscroll = (node.scrollHeight - node.scrollTop - node.offsetHeight) < AUTOSCROLL_BUFFER;
  };

  componentDidUpdate() {
      if (this.shouldAutoscroll)
        this.node.scrollTop = this.node.scrollHeight;
  }

  render() {
    return <div {...this.props} ref={node => {this.node = node}} onScroll={this.onScroll} />
  }
}

class Chat extends React.Component {

  state = {
    currentMessage: "",
    messages: [],
  };

  componentDidMount() {
    subscribeToMessages(messages => {
      this.setState({messages: messages});
    })
  }

  handleSubmit = (event) => {
      event.preventDefault();
      const values = serializeForm(event.target, { hash: true });
      this.setState({currentMessage: ""});
      sendMessage(
          'Brezza', // the auth.uid string
          'brezza', // the username
          'http://www.traveller.com.au/content/dam/images/g/u/n/q/h/0/image.related.articleLeadwide.620x349.gunpvd.png', // the user's profile image
          values.message // the message
      );
  };

  render() {
      const goodMessages = this.state.messages.filter(message => typeof message.text === 'string');
      const limitedGoodMessages = goodMessages.slice(-200);
      let currentGroupUid;
      const groupedMessages = limitedGoodMessages.reduce((accumulator, currentMessage) => {
            if (currentGroupUid && currentGroupUid === currentMessage.uid) {
                accumulator.slice(-1)[0].push(currentMessage);
            } else {
                currentGroupUid = currentMessage.uid;
                const newGroup = [];
                newGroup.push(currentMessage);
                accumulator.push(newGroup);
            }
            return accumulator;
          }, []);

    return (
      <div className="chat">
        <header className="chat-header">
          <h1 className="chat-title">HipReact</h1>
          <p className="chat-message-count"># messages: {this.state.messages.length}</p>
        </header>
        <AutoScroller className="messages">
          <ol className="message-groups">
              {groupedMessages.map(group =>
                  <li className="message-group" key={group[0].timestamp}>
                      <div className="message-group-avatar">
                          <img src={group[0].avatarURL} />
                      </div>
                      <ol className="messages">
                      {group.map(message =>
                          <li className="message" key={message._key}>{message.text}</li>
                      )}
                      </ol>
                  </li>
              )}
          </ol>
        </AutoScroller>

        <form className="new-message-form" onSubmit={this.handleSubmit}>
          <div className="new-message">
            <input
              type="text"
              name="message"
              value={this.state.currentMessage}
              onChange={event => this.setState({currentMessage: event.target.value})}
              placeholder="say something..."
            />
          </div>
        </form>
      </div>
    );
  }
}

render(<Chat />, document.getElementById("app"));
