module.exports = {
    language: {
      name: 'English'
    },
    main:['Feedback','Evaluation','Order','Account','Personal','Sign out','Beijing ICP No. 19057231-1','Copyright ©2019 Easeway All rights reserved'],
    person:['Feedback','Connect device','Device serial number','Submit','Change password','Old password','New Password','new password again','Submit'],
    login: [
        'username',
        'password',
        'Sign in',
        'forget',
        'No account',
        'Register'
    ],
    carts:['Personal Info', 'Name', 'Phone', 'Email', 'SerialNumber', 'New feedback', 'My feedback'],
    register:['Phone number','VF Code','Get VF  Code','Password','Please re-enter your password','Name','Email','Device serial number','Register','Accounts already held?','Sign in'],
    pwd:['Reset password','Phone number','VF Code','Get VF  Code','Password','Confirm'],
    evaluate:['Score','Evaluate','Reply','Submit','Please enter feedback','Cancel'],
    order:['Order time','Order ID','Order Status','Shipping Info','AWB Number','Name','Contact','Address','Post code','Product Model','Quantity'],
    feedback:[
        'Category',//0
        'Select categories',//1
        'Date',//2
        'Status',//3
        'Resolved',//4
        'To resolve',//5
        'Attachments',//6
        'Picture',//7
        'Video',//8
        'Select Video File Upload',//9
        'Feedback',//10
        'customer service',//11
        'Reply',//12
        'Submit',//13
        'Please enter feedback',//14
        'Submit',//15
        'Cancel',//16
        'Picture Preview'//17
    ],
    tips:{
        login:[
            'Please enter username',//0
            'Please enter password',//1
            'Password at least 8 bits',//2
            'Login Successful',//3
            'Please enter the correct mobile number',//4
            'Please enter your password',//5
            'Please re-enter your password',
            'The two passwords are different',//7
            'Passwords are different',//8
            'Please enter your phone number',//9
            'Password reset successfully',//10
            'VF code succeeded',//11
            'Please enter your name',//12
            'Please enter your Phone VF code',//13
            'The e-mail format is incorrect',//14
            'Registered successfully',//15
            'Please enter 11 digit device serial number'//16
        ],
        feedback:[
            'Only one video can be uploaded',
            'Tips',
            'The file format is incorrect',
            'Upload Files',
            'Incorrect, please select JPG or png.',
            'Incorrect, please select mp4/avi/rmvb',
            'File size exceeds limit',
            'Upload',
            'File too large, please less than 1M',
            'Submitted successfully',
            'Please enter feedback',
            'Reply Successfully',
            'Device not yet bound, please bind device first',

        ],
        evaluate:[
            'Tips',
            'Device not yet bound, please bind device first',
            'Please fill in the comments',
            'Submitted successfully',
            'Please select a rating',
            'Submitted successfully',

        ],
        person:[
            'Please enter a new password',
            'Please enter the new password again',
            'Passwords are different when entered twice',
            'Please enter the correct device serial number',
            'Please enter the device serial number',
            'Please enter password',
            'Password modified successfully',
            'Device Binding Successful'
        ]
    },
    errMsg0:[{
        code:-1,
        errMsg:"No data",
    },{
        code:100001,
        errMsg:"URL encoding failure",
    },{
        code:100002,
        errMsg:"ID required",
    },{
        code:100003,
        errMsg:"Mobile number blank or format wrong",
    },{
        code:100004,
        errMsg:"SMS VF code required",
    },{
        code:100005,
        errMsg:"password required",
    },{
        code:100006,
        errMsg:"SMS VF code expired",
    },{
        code:100007,
        errMsg:"mobile number has been registered",
    },{
        code:100008,
        errMsg:"Invalid VF code",
    },{
        code:100009,
        errMsg:"Invalid account or password, please check",
    },{
        code:100010,
        errMsg:"this mobile number is not yet registered, please reconfirm it",
    },{
        code:100011,
        errMsg:"serial number required",
    },{
        code:100012,
        errMsg:"SMS VF code sending failed",
    },{
        code:100013,
        errMsg:"wrong entry of barcode",
    },{
        code:100014,
        errMsg:"drug info on this barcode not found",
    },{
        code:100035,
        errMsg:"Use evaluation cannot be empty",
    },
    {
        code:100036,
        errMsg:"The score cannot be blank or the input is incorrect",
    },
    {
        code:100037,
        errMsg:"The Phonenumber is different from the bound Phonenumber, please re-enter",
    },
    {
        code:100039,
        errMsg:"Problem type does not exist",
    },
    {
        code:100040,
        errMsg:"The file is full. Please try again later",
    },
    {
        code:100041,
        errMsg:"The user name is already in use",
    },
    {
        code:100042,
        errMsg:"Account input cannot be empty",
    },
    {
        code:100043,
        errMsg:"Password input cannot be empty",
    },
    {
        code:100044,
        errMsg:"Wrong account and password input",
    },
    {
        code:100045,
        errMsg:"Initial password cannot be empty",
    },
    {
        code:100046,
        errMsg:"New password cannot be empty",
    },{
        code:100070,
        errMsg:"question details cannot be empty",
    },]
        
  }