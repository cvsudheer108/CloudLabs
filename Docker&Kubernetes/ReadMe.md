# Docker - Hands On - Step By Step
Ref : https://learning.oreilly.com/library/view/docker-in-practice/9781617294808/kindle_split_010.html

# Installation
    - Download and Install Docke for Windows
    - How to enable WSL2 integration:
        https://kubernetes.io/blog/2020/05/21/wsl-docker-kubernetes-on-the-windows-desktop/
    -  Verify with: >docker -v


## Commands
    - docker build	Build a Docker image
    - docker run	Run a Docker image as a container
    - docker commit	Commit a Docker container as an image
    - docker tag	Tag a Docker image

    - docker ps => get the runing instances
    - docker images => get the docker images
    - docker stop <container id or name>   => stop the instance
    - docker image rm [image id]   => remove the docker image from repo
    - docker container prune   => Remove all stopped container instnaces (not images)
    - docker volume ls   => lists all the volumes used by docker
    - docker volume prune  => Remove unused volumes

## Create a Docker Image for a NodeJS APP
    - Create a Dockefile (under 1.DockerForNodeJSApp)
    - The following explains hte content of the docker file.
    1 Defines the base image
    2 Declares the maintainer
    3 Clones the todoapp code
    4 Moves to the new cloned directory
    5 Runs the node package manager’s install command (> /dev/null means redirect the /p the special file to ignore it)
    6 Specifies that containers from the built image should listen on this port. External clients should listen to this port: http://localhost:8000 to access this app.
    7 Specifies which command will be run on startup of the container, basically command to run the app.

## Docker Commands in Action
    - Build the image (. means - build the docker file in the current folder)
        >docker build .
        - See the local images
        >docker images
        REPOSITORY   TAG       IMAGE ID       CREATED         SIZE
        <none>       <none>    6042d094dad2   6 minutes ago   957MB
    - Tag the image that now we created now
        >docker tag 6042d094dad2 todoapp
        REPOSITORY   TAG       IMAGE ID       CREATED         SIZE
        todoapp      latest    6042d094dad2   8 minutes ago   957MB
    - Run the docker image
        >docker run -i -t -p 8000:8000 --name test1 todoapp
        name => name of the instnace
        -p    => port mapping
    - Get the running instances of docker
    >docker ps -aq
        CONTAINER ID   IMAGE  COMMAND     CREATED    STATUS      PORTS          NAMES
         a81b0b5acc6e   todoapp   "docker-entrypoint.s…"   24 minutes ago   Up 23 minutes   0.0.0.0:8000->8000/tcp, :::8000->8000/tcp   test1
    - Run multiple instances of an image, it runs on a new external port : 8001
        >docker run -i -t -p 8001:8000 --name test1 todoapp1

    NOTE: You can run multipe instances of todoapp. The runtime doesn't copy the whole layers for each instance, but shares it across. That is why Docker can sacle in a much better way.

## Docker Architecture
    - Check the docker architecture components below
        - docker public registry
        - docker daemon -> who receives request, talks to client in REST requests, downloads the images from    internet , if required. A daemon is a process that runs in the background rather than under the direct control of the user.The docker command is a client, and the Docker daemon acts as the server doing the processing on your Docker containers and images. By default the daemon is not possible to be accessed from xternal world, but it is possible to do that.
        - docker client  -> docker instance
        - docker registry (local)  -> stored the images
## Run Docker Container as a Demon
    - Similar to running the container as a service
        > docker run -d -i -p 8000:8000 --name todoDaemon todoapp
        -d : run as a daemon, -i : interactive mode, -p : port mapping
    - But what is the daemon stops. We have restart flags to contol the behavior.
        > docker run -d --restart=always -p 8000:8000 --name todoDaemon todoapp
        no	->Don’t restart when the container exits
        always	-?Always restart when the container exits
        unless-stopped	->Always restart, but remember explicitly stopping
        on-failure[:max-retry]	->Restart only on failure

## Docker Commit
    - Commit the current resources as an image 
        >docker commit todobug1

## Docker tagging
    - You’ve now saved the state of your container by committing, and you have a random string as the ID of your image.
        >docker tag 6042d094dad2 todoapp
## Docker push
    - To push to Docker Hub
        docker pull debian:wheezy                             
        docker tag debian:wheezy adev/debian:mywheezy1       
        docker push adev/debian:mywheezy1

## Docker Best Practices:
    - To illustrate see the DockerFile in the fodler : 2.RunFlskApplicatiom
        >docker build -t flask
        -t => Tag the image
        >docker run -d -P flask
        -d : daemon, -P: Use the port mentioned in the docker file, flask : image name
    - The following are some of the improvements:
        - The fact that it uses the ubuntu:14.04 official image is good. However, you then proceeded to install a few packages using multiple RUN commands. This is bad practice, as it will add unnecessary layers to the image. Instead combine the run commands:
            RUN apt-get update && apt-get install -y \
                python \
                python-pip
            RUN pip install flask
        - You also used the ADD command to copy a simple file. Instead in this example, you should use the COPY command (ADD allows more-complex file copy scenarios).
            COPY hello.py /tmp/hello.py
        - Run a single process per container. Although you can run multiple processes per container. building images that will run only one process or at least one functional service per container will help you build decoupled applications that can scale.
        - Use docker volumes to manage the data related to the containers to be persisted outside of it. Do not assume that your containers will live on; they are ephemeral and will be stopped and restarted. 
        - Use a .dockerignore file. When building images, Docker by default will copy the content of the working directory where the Dockerfile exists (i.e., the build context) inside the image. 
        - Finally, minimize the number of layers of your images and take advantage of the image cache

## Kubernetes:
    - Is a container Orchestration system
        - Kubernetes can monitor the health of a container and restart it when it fails. If a node fails, the Kubernetes management system can automatically reschedule work onto healthy nodes.
        - By scheduling a diverse set of workloads on a common set of machines, users can drive dramatically higher utilization compared to static manual placement. 
        - With large clusters, keeping track of all the containers that are running can be difficult. Kubernetes provides a flexible labeling system that allows both users and other systems to think in sets of containers. 
        - Kubernetes is built to enable easy horizontal scaling. Scaling and load balancing are intrinsic concepts.

### Kube Concepts:
    - Cluster scheduling : The process of placing a container on a specific node to optimize the reliability and utilization of the cluster.
    - Pods : A group of containers that must be placed on a single node and work together as a team. Allowing a set of containers to work closely together on a single node is a powerful way to make applications even more manageable.
    - Labels : Data attached to pods in order to organize a group for monitoring and management.
    - Replication controllers - Agents that work to make sure that a horizontal scaling group or pod is reliably maintained.
    - Network services : A way to communicate between not just pods, but groups of pods by using dynamically configured naming and network proxies.
    - Kubernets Masnter - Uses an API server to communicate. The client will be running kubectl. There us a storage for the master called : Master Storage
        - Scheduler : This is responsible to make sure the pods are running properly. It also takes are of replication to take care of Scaling.
    - Node : Pods are launched to the nodes. Each node will have a controller called : Kubelet and a Proxy that will take care of networking for the Pod.

#### Running a container using Kube
    - Refer the folder 3.RunningContaineronKube
        - Create a file : kube.yaml
        - Run it from client:
            > kubectl create -f kube.yaml
            Once the image is downloaded, the container will start running

#### Using Labels with Pods
    - Refer the folder 3.RunningContaineronKube
        - Create the file :label-demo.yanl
        - Now query suign the label:
            > kubectl get pods --selector="foo=bar"
### Using Pod Templates & Replication
    - Refer the folder 3.RunningContaineronKube
        - Create the file :label-demo.yanl
            >kubectl create -f pod-template.yml
            Get Replication controller:
            >kubectl get rc
            Resize the pod:
            > kubectl resize --replicas=4 rc rcgame

## Docker and Cloud
    - More on this in another post.

## Conclusion
    Docker is definitely the integral part of the cloud-native design and here we got the fundamentals of docker and Kubernetes so that we can learn about the cloud integration using these technologies.