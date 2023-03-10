import app from './config/app';
import vars from './config/vars';
import './config/start';

app.set('port', vars.port || 8080);
export default app.listen(app.get('port'), '0.0.0.0', () => {
    console.log(`HTTP server listening on port ${vars.port}`);
});
