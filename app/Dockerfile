FROM python:3

RUN python3 -m pip install -U pip
RUN pip3 install flask
RUN pip3 install uwsgi
RUN pip install -r requirements.txt

ADD . /www
WORKDIR /www

COPY . .
CMD ["uwsgi", "--ini", "uwsgi.ini"]
# CMD uwsgi uwsgi.ini