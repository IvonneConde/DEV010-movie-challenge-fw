// // ErrorBoundary.jsx
// import React, { Component } from 'react';

// class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
//   constructor(props: {}) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error: any) {
//     return { hasError: true };
//   }

//   componentDidCatch(error: any, errorInfo: any) {
//     console.error('Error caught by ErrorBoundary:', error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return <div>Something went wrong. Please try again later.</div>;
//     }

//     return this.props.children;
//   }
// }

// export default ErrorBoundary;
