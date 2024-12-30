import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);  // Gọi super(props) để khởi tạo this
    this.state = { hasError: false }; 
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }; 
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    // Đảm bảo this.state không bị undefined
    if (this.state.hasError) {  
      return <h1>Đã xảy ra lỗi, vui lòng thử lại sau!</h1>;
    }
    return this.props.children; 
  }
}

export default ErrorBoundary;
