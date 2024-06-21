pipeline{
    agent { label 'aws-agent' }
    environment{
        TOKENAWS = credentials('controller-ssh-key')
    }
    stages{ 
        stage('Deploy to Testing'){
            steps{
            sh 'ssh -T -oStrictHostKeyChecking=no -i "$TOKENAWS" ec2-user@54.196.103.148 " sudo dnf update; sudo dnf install git -y; sudo dnf install -y httpd; sudo systemctl start httpd; sudo rm -Rf /var/www/html/; sudo git clone https://github.com/andreagonzalezsilva/AndreaFinalExamDevOps_TicTacToe /var/www/html"'
            script{
                    try{
                        // Install Selenium webdriver
                        sh 'npm install selenium-webdriver'

                        // Run the test and capture the output
                        def output = sh(script: 'node test/testGameIcon.js', returnStdout: true).trim()
             
                        // Print the output 
                        echo "Test Output: ${output}"

                       // Write the result to a file
                        if(output.contains('Test Success')){
                            writeFile file: env.TEST_RESULT_FILE, text: 'true'
                        } else{
                            writeFile file: env.TEST_RESULT_FILE, text: 'false'
                        }
                        
                    } catch (Exception e){
                        echo "Test failed: ${e.message}"
                        writeFile file: env.TEST_RESULT_FILE, text: 'false'
                    }
                }
            }
        }
        stage('Deploy to Staging'){
            steps{
            sh 'ssh -T -oStrictHostKeyChecking=no -i "$TOKENAWS" ec2-user@18.215.246.111 " sudo dnf update; sudo dnf install git -y; sudo dnf install -y httpd; sudo systemctl start httpd; sudo rm -Rf /var/www/html/; sudo git clone https://github.com/andreagonzalezsilva/AndreaFinalExamDevOps_TicTacToe /var/www/html"'
            }
        }
        stage('Deploy to Production_Env1'){
            steps{
            sh 'ssh -T -oStrictHostKeyChecking=no -i "$TOKENAWS" ec2-user@54.160.210.132 " sudo dnf update; sudo dnf install git -y; sudo dnf install -y httpd; sudo systemctl start httpd; sudo rm -Rf /var/www/html/; sudo git clone https://github.com/andreagonzalezsilva/AndreaFinalExamDevOps_TicTacToe /var/www/html"'
            }
        }
        stage('Deploy to Production_Env2'){
            steps{
            sh 'ssh -T -oStrictHostKeyChecking=no -i "$TOKENAWS" ec2-user@18.232.80.185 " sudo dnf update; sudo dnf install git -y; sudo dnf install -y httpd; sudo systemctl start httpd; sudo rm -Rf /var/www/html/; sudo git clone https://github.com/andreagonzalezsilva/AndreaFinalExamDevOps_TicTacToe /var/www/html"'
            }
        }
    }
}