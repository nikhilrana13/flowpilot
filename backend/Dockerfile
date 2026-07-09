# install node js 22 
FROM node:22-alpine 

# work directory 
WORKDIR /backend 

#copy package.json 
COPY package*.json ./   

# install dependencies
RUN npm install 

# Copy project files
COPY . .

#EXPOSE port 
EXPOSE 4000

#start server 
CMD ["npm", "run","dev"] 
