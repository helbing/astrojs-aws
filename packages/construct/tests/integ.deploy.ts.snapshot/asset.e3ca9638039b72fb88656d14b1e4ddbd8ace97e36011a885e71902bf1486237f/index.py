import json
import logging
import urllib3
import re

logger = logging.getLogger()
logger.setLevel(logging.INFO)
http = urllib3.PoolManager()

def handler(event, context):
  print(json.dumps(event))

  request_type = event['RequestType']
  props = event['ResourceProperties']

  url = props['url']
  http_method = props['method'] if 'method' in props else 'GET'
  http_data = props['data'] if 'data' in props else None

  if request_type in ['Create', 'Update']:
    logger.info(f'Sending request to {url}')
    response = http.request(http_method, url, body=http_data, retries=urllib3.Retry(10, backoff_factor=1))
    title_re=re.compile(r'<title>(.*?)</title>')
    match = title_re.search(response.data.decode('utf-8'))
    if match:
      title = match.group(1)
    else:
      title = ''
    data = {
      'title': title,
      'status': response.status,
      'url': url,
      'body': response.data.decode('utf-8')[:256]
    }
    return {'Data': data}
