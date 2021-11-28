FROM blackamda/queenamdi:public

RUN git clone https://github.com/Janithsadanuwan/Queen-Nilu.git /root/Queen-Nilu
WORKDIR /root/QueenAmdi/
ENV TZ=Asia/Colombo
RUN npm install supervisor -g
RUN yarn install --no-audit

CMD ["node", "assets/module.js"]
