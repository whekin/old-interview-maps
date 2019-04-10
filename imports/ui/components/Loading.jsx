import React, { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <div className="Loading">
        <div className="Loading__preloader">
          <svg width="200" height="200" viewBox="0 0 100 100">
            <polyline className="line-cornered stroke-still" points="0,0 100,0 100,100" strokeWidth="10" fill="none" />
            <polyline className="line-cornered stroke-still" points="0,0 0,100 100,100" strokeWidth="10" fill="none" />
            <polyline className="line-cornered stroke-animation" points="0,0 100,0 100,100" strokeWidth="10" fill="none" />
            <polyline className="line-cornered stroke-animation" points="0,0 0,100 100,100" strokeWidth="10" fill="none" />
          </svg>
        </div>
      </div>
    );
  }
}

export default Loading;
