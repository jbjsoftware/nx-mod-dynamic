import * as ReactDOM from 'react-dom/client';
import { StandaloneRouter } from './components/standalone-router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<StandaloneRouter />);
