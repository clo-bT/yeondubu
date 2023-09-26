FROM python:3

ADD . /www
WORKDIR /www

RUN python3 -m pip install -U pip
RUN pip3 install flask
RUN pip3 install flask-cors
RUN pip3 install uwsgi
RUN pip3 install rembg
RUN pip3 install h5py
RUN pip3 install tensorflow
RUN pip3 install Pillow

CMD ["uwsgi", "--ini", "uwsgi.ini"]
# CMD uwsgi uwsgi.ini