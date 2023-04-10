const ErrorHandler = require('../utils/errorhand');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const cloudinary = require('cloudinary');
const Book = require('../models/book');
const Accession = require('../models/accession');
const Borrow = require('../models/borrow');
const HistoryLog = require('../models/historylog')
const User = require('../models/user');
const Return = require('../models/return');
const { findById } = require('../models/book');

exports.getBooks = async (req, res, next) => {
    const yearPub = await Book.find().select('yearPub -_id')
    let yearPub_val = []
    yearPub.forEach(y => {
        yearPub_val.push(y.yearPub)
    });
    let formattedYearPubArr = yearPub_val.map(Number)
    const lowestYearPub = Math.min(...formattedYearPubArr)
    const highestYearPub = Math.max(...formattedYearPubArr)
    const bookSubjects = await Book.distinct('subjects')

    let sub_arr = []
    let subjects = req.body.subjects

    const isArray = Array.isArray(subjects)
    if (isArray == false) {
        sub_arr = [subjects]
    } else if (isArray == true) {
        sub_arr = subjects
    }

    let min_year = lowestYearPub.toString()
    let max_year = highestYearPub.toString()

    if (!req.body.minYear && !req.body.maxYear) {
        // console.log('1st')
        min_year = lowestYearPub.toString()
        max_year = highestYearPub.toString()
    } else if (req.body.minYear && req.body.maxYear == 'undefined') {
        // console.log('2nd')
        min_year = req.body.minYear
        max_year = highestYearPub.toString()
    } else if (req.body.minYear == 'undefined' && req.body.maxYear) {
        // console.log('3rd')
        min_year = lowestYearPub.toString()
        max_year = req.body.maxYear
    } else if (req.body.minYear && req.body.maxYear) {
        // console.log('4th')
        min_year = req.body.minYear
        max_year = req.body.maxYear
    }

    let book = {}

    if (sub_arr[0] != undefined || sub_arr[0] != null) {
        book = await Book.aggregate([
            {
                $match: {
                    "subjects": { "$in": sub_arr },
                    "yearPub": { '$gte': min_year, '$lte': max_year }
                }
            },
        ])
    } else {
        book = await Book.aggregate([
            {
                $match: {
                    "yearPub": { '$gte': min_year, '$lte': max_year }
                }
            },
        ])
    }

    res.status(200).json({
        success: true,
        book,
        lowestYearPub,
        highestYearPub,
        bookSubjects
    })
}

exports.createBook = async (req, res, next) => {
    console.log(req.body)
    let book = {}
    const user = await User.findById(req.user._id);
    try {
        if (req.body.bookImage === '') {
            if (req.body.callNumberPrefix == 'Fil') {
                req.body.Fil = true
            } else if (req.body.callNumberPrefix == 'Ref') {
                req.body.Ref = true
            } else if (req.body.callNumberPrefix == 'Bio') {
                req.body.Bio = true
            } else if (req.body.callNumberPrefix == 'Fic') {
                req.body.Fic = true
            } else if (req.body.callNumberPrefix == 'Res') {
                req.body.Res = true
            } else { }

            const book = await Book.create(req.body);

        } else {
            const result = await cloudinary.v2.uploader.upload(req.body.bookImage, {
                folder: 'TUPT_Library/Books/' + req.body.title,
                width: 150,
                height: 150,
                crop: "scale"
            })

            req.body.book_image = {
                public_id: result.public_id,
                url: result.secure_url
            }

            // req.body.entered_by = user.name

            if (req.body.callNumberPrefix == 'Fil') {
                req.body.Fil = true
            } else if (req.body.callNumberPrefix == 'Ref') {
                req.body.Ref = true
            } else if (req.body.callNumberPrefix == 'Bio') {
                req.body.Bio = true
            } else if (req.body.callNumberPrefix == 'Fic') {
                req.body.Fic = true
            } else if (req.body.callNumberPrefix == 'Res') {
                req.body.Res = true
            } else { }

            const book = await Book.create(req.body);
        }

        const nowDate = new Date();
        const newDate = (nowDate.getMonth() + 1) + '/' + nowDate.getDate() + '/' + nowDate.getFullYear();
        // const user = await User.findById(req.user._id);
        const formatDate = nowDate.toLocaleString('en-US', {
            dateStyle: 'full',
            timeStyle: 'short',
            hour12: true
        })
        const history = await HistoryLog.create({
            userId: user._id,
            historylogText: user.name + ' added a book "' + book.title + '", on ' + newDate,
            historylogDate: formatDate,
            historylogType: 'Create'
        });

        res.status(201).json({
            success: true,
            book,
            history,
            user
        });

    } catch (err) {
        console.log(err)
    }
};

exports.getSingleBook = async (req, res, next) => {
    const BookDetails = await Book.findById(req.params.id);
    if (!BookDetails) {
        return next(new ErrorHandler('Book not found', 404));
    }
    res.status(200).json({
        success: true,
        BookDetails
    })
}

exports.updateBook = async (req, res, next) => {

    // console.log(req.body)
    const check_book = await Book.findById(req.params.id);
    let book = {}
    try {
        if (!check_book) {
            return next(new ErrorHandler('Book not found', 404));
        }
        if (req.body.bookImage === '') {

            const callNumberPrefix = req.body.callNumberPrefix
            if (req.body.callNumberPrefix == "Fil") {
                req.body.Fil = 1
                req.body.Ref = 0
                req.body.Bio = 0
                req.body.Fic = 0
                req.body.Res = 0
            } else if (req.body.callNumberPrefix == "Ref") {
                req.body.Fil = 0
                req.body.Ref = 1
                req.body.Bio = 0
                req.body.Fic = 0
                req.body.Res = 0
            } else if (req.body.callNumberPrefix == "Bio") {
                req.body.Fil = 0
                req.body.Ref = 0
                req.body.Bio = 1
                req.body.Fic = 0
                req.body.Res = 0
            } else if (req.body.callNumberPrefix == "Fic") {
                req.body.Fil = 0
                req.body.Ref = 0
                req.body.Bio = 0
                req.body.Fic = 1
                req.body.Res = 0
            } else if (req.body.callNumberPrefix == "Res") {
                req.body.Fil = 0
                req.body.Ref = 0
                req.body.Bio = 0
                req.body.Fic = 0
                req.body.Res = 1
            }

            book = await Book.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            })
        }

        else {
            const result = await cloudinary.v2.uploader.upload(req.body.bookImage, {
                folder: 'TUPT_Library/Books/' + req.body.title,
                width: 150,
                height: 150,
                crop: "scale"
            })

            req.body.book_image = {
                public_id: result.public_id,
                url: result.secure_url
            }

            if (req.body.callNumberPrefix == "Fil") {
                req.body.Fil = 1
                req.body.Ref = 0
                req.body.Bio = 0
                req.body.Fic = 0
                req.body.Res = 0
            } else if (req.body.callNumberPrefix == "Ref") {
                req.body.Fil = 0
                req.body.Ref = 1
                req.body.Bio = 0
                req.body.Fic = 0
                req.body.Res = 0
            } else if (req.body.callNumberPrefix == "Bio") {
                req.body.Fil = 0
                req.body.Ref = 0
                req.body.Bio = 1
                req.body.Fic = 0
                req.body.Res = 0
            } else if (req.body.callNumberPrefix == "Fic") {
                req.body.Fil = 0
                req.body.Ref = 0
                req.body.Bio = 0
                req.body.Fic = 1
                req.body.Res = 0
            } else if (req.body.callNumberPrefix == "Res") {
                req.body.Fil = 0
                req.body.Ref = 0
                req.body.Bio = 0
                req.body.Fic = 0
                req.body.Res = 1
            }

            book = await Book.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            })
        }
        //create history Log
        const nowDate = new Date();
        const newDate = (nowDate.getMonth() + 1) + '/' + nowDate.getDate() + '/' + nowDate.getFullYear();
        const user = await User.findById(req.user._id);
        const formatDate = nowDate.toLocaleString('en-US', {
            dateStyle: 'full',
            timeStyle: 'short',
            hour12: true
        })
        const history = await HistoryLog.create({
            userId: user._id,
            historylogText: user.name + " updated a Book titled: " + book.title + ", on " + newDate,
            historylogDate: formatDate,
            historylogType: 'Update'
        });

        res.status(200).json({
            success: true,
            book,
            history
        })
    } catch (err) {
        console.log(err)
    }
}

exports.deleteBook = async (req, res, next) => {

    const book = await Book.findById(req.params.id);
    if (!book) {
        return next(new ErrorHandler('Book not found', 404));
    }
    await book.remove();
    //create history Log
    const nowDate = new Date();
    const newDate = (nowDate.getMonth() + 1) + '/' + nowDate.getDate() + '/' + nowDate.getFullYear();
    const formatDate = nowDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', hour12: true })
    const user = await User.findById(req.user._id);
    const history = await HistoryLog.create(
        {
            userId: user._id,
            historylogText: user.name + " deleted a Book titled: " + book.title + ", on " + newDate,
            historylogDate: formatDate,
            historylogType: 'Delete'
        }
    );

    res.status(200).json({
        success: true,
        message: 'Book deleted',
        history
    })
}

exports.createBookAccession = async (req, res, next) => {
    // const all_accession = []
    const accession_number = req.body.accession

    const accession = await Accession.create({
        accession_number: accession_number,
        on_shelf: 1,
        out: 0
    })
    
    const book = await Book.updateOne({ _id: req.body.bookId }, { $push: { accession_numbers: accession._id } })

    const newBook = await Book.findById(req.body.bookId)
    const nowDate = new Date();
    const newDate = (nowDate.getMonth() + 1) + '/' + nowDate.getDate() + '/' + nowDate.getFullYear();
    const formatDate = nowDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', hour12: true })
    const user = await User.findById(req.user._id);
    const history = await HistoryLog.create(
        {
            userId: user._id,
            historylogText: user.name + " added a Book accession from " + newBook.title + ", on " + newDate,
            historylogDate: formatDate,
            historylogType: 'Create'
        }
    );

    res.status(200).json({
        success: true,
        message: 'Accession Added',
        accession,
        history
    })
}

exports.updateBookAccession = async (req, res, next) => {
    const today = new Date()
    let dueDate = new Date()

    if (today.getDay() === 5) {
        dueDate.setTime(today.getTime() + (3 * 24 * 3600000));
    } else {
        dueDate.setTime(today.getTime() + (24 * 3600000));
    }

    if (req.body.func == 'give') {
        const userId = await User.findOne({ id_number: req.body.tuptId })
        const accession_number = await Accession.findOne({ accession_number: req.body.accession })
        if (!userId) {
            return res.status(401).json({ success: false, message: 'No User Found!' })
        }
        if (!accession_number) {
            return res.status(401).json({ success: false, message: 'No ACcession Found!' })
        }
        await Accession.findOneAndUpdate(
            { accession_number: req.body.accession },
            {
                on_shelf: 0,
                out: 1,
                userId: userId
            }
        )
        const bookId = await Book.findOne({
            accession_numbers: { "$in": [accession_number._id] }
        })
        console.log(bookId)
        await Book.findByIdAndUpdate(
            { _id: bookId._id },
            { $inc: { on_shelf: -1, out: 1 } }
        )

        const checkBorrow = await Borrow.findOne({ userId: userId })
        console.log(checkBorrow)
        if (!checkBorrow) {
            console.log('no borrow')
            await Borrow.create({
                userId: userId._id,
                bookId: bookId._id,
                accessions: accession_number._id,
                borrower_role: userId.role,
                appointmentDate: today,
                dueDate: dueDate,
                status: 'Accepted'
            })
        } else {
            console.log('has borrow')
            await Borrow.findOneAndUpdate(
                { _id: checkBorrow._id },
                {
                    $push: {
                        bookId: bookId._id,
                        accession_numbers: accession_number._id
                    }
                },
            )

        }

    } else if (req.body.func == 'retrieve') {
        const accession = await Accession.findOne({ accession_number: req.body.accession })
        const book = await Book.findOne({ accession_numbers: { "$in": [accession._id] } })

        const borrow = await Borrow.findOne({ userId: accession.userId })

        const bookArray = borrow.bookId
        const user = await User.findOne({ _id: accession.userId })

        console.log(borrow.bookId.length)

        if (borrow.bookId.length > 1){
            console.log('not delete')
            await Borrow.findOneAndUpdate(
                { _id: borrow._id },
                {
                    $pull: {
                        bookId: book._id,
                        accession_numbers: accession._id
                    }
                },
            )
            await Return.create({
                userId: accession.userId,
                bookId: book._id,
                course: user.course,
                returnedDate: today,
                returnedTo: req.user.id
            })
        } else{
            console.log('delete')
            await Return.create({
                userId: accession.userId,
                bookId: book._id,
                course: user.course,
                returnedDate: today,
                returnedTo: req.user.id
            })
    
            await Borrow.findByIdAndDelete(borrow._id)
        }

        await Book.findByIdAndUpdate(
            { _id: book._id },
            { $inc: { on_shelf: 1, out: -1 } }
        )

        await Accession.findOneAndUpdate(
            { accession_number: req.body.accession },
            {
                on_shelf: 1,
                out: 0,
                userId: null
            }
        )
    }

    res.status(200).json({
        success: true,
        // accessions
    })
}

exports.singleBookAccession = async (req, res, next) => {
    const getbook_accessions = await Book.findById(req.params.id).populate({
        path: 'accession_numbers',
        populate: {
            path: 'userId',
            select: ['name', 'id_number', 'role']
        }
    })

    const bookAccessions = getbook_accessions.accession_numbers

    const bookDetails = await Book.findById(req.params.id).select(['title', 'copy', '-_id'])


    res.status(200).json({
        success: true,
        bookAccessions,
        bookDetails
    })
}

exports.editBookAccession = async (req, res, next) => {

    console.log(req.params.id, req.body.accession,  req.body.bookId)
    const accession = await Accession.findByIdAndUpdate(req.params.id, { accession_number: req.body.accession })
    // console.log(req.body.bookId)
    const book = await Book.findById(req.body.bookId)
    const nowDate = new Date();
    const newDate = (nowDate.getMonth() + 1) + '/' + nowDate.getDate() + '/' + nowDate.getFullYear();
    const formatDate = nowDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', hour12: true })
    const user = await User.findById(req.user._id);
    const history = await HistoryLog.create(
        {
            userId: user._id,
            historylogText: user.name + " Edited a Book accession from " + book.title + ", on " + newDate,
            historylogDate: formatDate,
            historylogType: 'Update'
        }
    );

    res.status(200).json({
        success: true,
        message: 'Book Edited',
        history
    })

}

exports.deleteBookAccession = async (req, res, next) => {
    const accession = await Accession.findById(req.params.id);
    if (!accession) {
        return next(new ErrorHandler('Accession Log not found', 404));
    }
    await Book.updateOne({ _id: req.body.bookId }, { $pull: { accession_numbers: accession._id } })
    await accession.remove();

    const book = await Book.findById(req.body.bookId)
    const nowDate = new Date();
    const newDate = (nowDate.getMonth() + 1) + '/' + nowDate.getDate() + '/' + nowDate.getFullYear();
    const formatDate = nowDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', hour12: true })
    const user = await User.findById(req.user._id);
    const history = await HistoryLog.create(
        {
            userId: user._id,
            historylogText: user.name + " deleted a Book accession from " + book.title + ", on " + newDate,
            historylogDate: formatDate,
            historylogType: 'Delete'
        }
    );

    res.status(200).json({
        success: true,
        message: 'Book deleted',
        history
    })
}

// call/install the marcjs with the command: npm install marcjs
// fs is built-in with node and doesn't need to be installed:
// Importing the MRC (ignore: Could not find a declaration file for module 'marcjs'. error)
const { Marc } = require('marcjs');
const fs = require('fs');
const { Console } = require('console');

exports.importMRC = async (req, res, next) => {
    // Create the code necessary to upload the file in request to the temporary folder named tmp in the root directory
    // console.log(req.files.file)

    if (!req.files || req.files.file.mimetype !== 'application/octet-stream') {
        return next(new ErrorHandler("No File Uploaded or Incorrect Extension", 404));
        // return res.status(404).json({success: false, message: 'No File Uploaded or Incorrect Extension'})
    }
    const fileData = req.files.file.data;
    const filename = req.files.file.name;
    const newFileName = filename.replace(/\s/g, '_');
    const filePath = process.cwd() + '/tmp/' + newFileName; // Set the file path
    fs.access(filePath, fs.constants.F_OK, async (err) => {
        if (!err) {
            // File already exists, delete it before overwriting
            fs.unlink(filePath, async (err) => {
                if (err) {
                    return next(new ErrorHandler('File upload failed', 500));
                }
                // console.log('Deleted existing file');
                // Create the file through fs
                fs.writeFile(filePath, fileData, (err) => {
                    if (err) {
                        return next(new ErrorHandler('File upload failed', 500));
                    }
                    // Now that the file has been created, we can now read it.
                })
                // Read the uploaded file using marcjs
                const reader = Marc.stream(fs.createReadStream(filePath), 'Iso2709');
                let Mrcbookdata;
                reader.on('data', (record) => {
                    const MrcContent = JSON.parse(record.as('mij'));

                    //  We can read the MRC content through the fields object as is below
                    //  code below reads the first field content assuming that all mrc is only one content/record
                    //  we then access the field through the key identifier such as '001'.
                    //  console.log(MrcContent.fields[0]['001']);
                    //  code outputs the value of the 001 field: 'UP-CODE'
                    //  Example:
                    //  ['040'] catalogue number
                    //  If you have trouble knowing which ID is which you can refer to this link: https://www.loc.gov/marc/bibliographic/

                    //  Code Below Finds the Field with the ID of '020' which correspondes to the International Standard Book Number (ISBN)
                    //  console.log(MrcContent.fields.find(field => field['020'])['020'].subfields[0]['a']);
                    //  MrcContent.fields.find(field => field['020']) returns the data of the field with the ID of '020'
                    //  We still need to access said data through the addition of ['020'] at the end and as such:
                    //  MrcContent.fields.find(field => field['020'])['020'] <---- We can now access the data inside of the field ['020']
                    //  This has been done to use .subfields as is the structure of mrc files. and as such we can access the subfields of the field with the ID of '020'
                    //  console.log(MrcContent.fields.find(field => field['020'])['020'].subfields[0]['a']); // This will output the value of the subfield with the ID of 'a'
                    //  console.log(MrcContent.fields.find(field => field['020'])['020'].subfields[0]['b']); // This will output the value of the subfield with the ID of 'b'
                    //  etc....
                    //  This has been made inline to ease code structurization.

                    //  Testing:
                    //  console.log( MrcContent.fields.find(field => field['245'])?.['245'].subfields.find(subfield => subfield['a'])?.['a'] );

                    //  040 - Cataloging    // Cataloging Source
                    //  035 - UP system ID // System Control Number

                    Mrcbookdata = {
                        // Using tertiary condition here just to ease code length
                        title: MrcContent.fields.find(field => field['245'])?.['245'].subfields.find(subfield => subfield['a'])?.['a'],
                        responsibility: MrcContent.fields.find(field => field['245'])?.['245'].subfields.find(subfield => subfield['c'])?.['c'],
                        uniform_title: MrcContent.fields.find(field => field['240'])?.['240'].subfields.find(subfield => subfield['a'])?.['a'],
                        main_author: MrcContent.fields.find(field => field['100'])?.['100'].subfields.find(subfield => subfield['a'])?.['a'],
                        other_author: MrcContent.fields.find(field => field['700'])?.['700'].subfields.find(subfield => subfield['a'])?.['a'],
                        corp_author: MrcContent.fields.find(field => field['110'])?.['110'].subfields.find(subfield => subfield['a'])?.['a'],
                        placePub: MrcContent.fields.find(field => field['264'])?.['264'].subfields.find(subfield => subfield['a'])?.['a'],
                        publisher: MrcContent.fields.find(field => field['264'])?.['264'].subfields.find(subfield => subfield['b'])?.['b'],
                        yearPub: MrcContent.fields.find(field => field['264'])?.['264'].subfields.find(subfield => subfield['c'])?.['c'],
                        edition: MrcContent.fields.find(field => field['250'])?.['250'].subfields.find(subfield => subfield['a'])?.['a'],
                        series: MrcContent.fields.find(field => field['400'])?.['400'].subfields.find(subfield => subfield['a'])?.['a'],
                        gen_notes: MrcContent.fields.find(field => field['520'])?.['520'].subfields.find(subfield => subfield['a'])?.['a'],
                        isbn: MrcContent.fields.find(field => field['020'])?.['020'].subfields.find(subfield => subfield['a'])?.['a'],
                        languange: MrcContent.fields.find(field => field['041'])?.['041'].subfields.find(subfield => subfield['a'])?.['a'],
                        abstract: MrcContent.fields.find(field => field['520'])?.['520'].subfields.find(subfield => subfield['a'])?.['a'], // Abstract or Summary
                    }
                });
                // console.log('test')
                // await Book.create(Mrcbookdata)
                reader.on('end', () => {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            return next(new ErrorHandler('File Deletion failed', 500));
                        }
                        // console.log('Deleted temp file');
                    });
                    // console.log(Mrcbookdata)
                    res.status(200).json({
                        success: true,
                        Mrcbookdata
                    })
                });
            });
        } else {
            // File doesn't exist, create it first
            fs.writeFile(filePath, fileData, (err) => {
                if (err) {
                    return next(new ErrorHandler('File upload failed', 500));
                }
                // Now that the file has been created, we can now read it.
            })
            // File doesn't exist, read the uploaded/created file
            const reader = Marc.stream(fs.createReadStream(filePath), 'Iso2709');
            let Mrcbookdata;
            reader.on('data', (record) => {
                const MrcContent = JSON.parse(record.as('mij'));
                Mrcbookdata = {
                    // Using tertiary condition here just to ease code length
                    title: MrcContent.fields.find(field => field['245'])?.['245'].subfields.find(subfield => subfield['a'])?.['a'],
                    responsibility: MrcContent.fields.find(field => field['245'])?.['245'].subfields.find(subfield => subfield['c'])?.['c'],
                    uniform_title: MrcContent.fields.find(field => field['240'])?.['240'].subfields.find(subfield => subfield['a'])?.['a'],
                    main_author: MrcContent.fields.find(field => field['100'])?.['100'].subfields.find(subfield => subfield['a'])?.['a'],
                    other_author: MrcContent.fields.find(field => field['700'])?.['700'].subfields.find(subfield => subfield['a'])?.['a'],
                    corp_author: MrcContent.fields.find(field => field['110'])?.['110'].subfields.find(subfield => subfield['a'])?.['a'],
                    placePub: MrcContent.fields.find(field => field['264'])?.['264'].subfields.find(subfield => subfield['a'])?.['a'],
                    publisher: MrcContent.fields.find(field => field['264'])?.['264'].subfields.find(subfield => subfield['b'])?.['b'],
                    yearPub: MrcContent.fields.find(field => field['264'])?.['264'].subfields.find(subfield => subfield['c'])?.['c'],
                    edition: MrcContent.fields.find(field => field['250'])?.['250'].subfields.find(subfield => subfield['a'])?.['a'],
                    series: MrcContent.fields.find(field => field['400'])?.['400'].subfields.find(subfield => subfield['a'])?.['a'],
                    gen_notes: MrcContent.fields.find(field => field['520'])?.['520'].subfields.find(subfield => subfield['a'])?.['a'],
                    isbn: MrcContent.fields.find(field => field['020'])?.['020'].subfields.find(subfield => subfield['a'])?.['a'],
                    languange: MrcContent.fields.find(field => field['041'])?.['041'].subfields.find(subfield => subfield['a'])?.['a'],
                    abstract: MrcContent.fields.find(field => field['520'])?.['520'].subfields.find(subfield => subfield['a'])?.['a'], // Abstract or Summary
                }
            });
            reader.on('end', () => {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        return next(new ErrorHandler('File Deletion failed', 500));
                    }
                });
                Book.create(Mrcbookdata)
                // console.log(Mrcbookdata)
                res.status(200).json({
                    success: true,
                    Mrcbookdata
                })
            });
        }
    });


}

exports.getBookReports = async (req, res, next) => {
    const book = await Book.aggregate([
        {
            "$lookup": {
                "from": "accessions",
                "localField": "accession_numbers",
                "foreignField": "_id",
                "pipeline": [
                    {
                        $project: {
                            _id: 0,
                            accession_number: 1,
                        }
                    }
                ],
                "as": "accession_numbers"
            }

        },
        {
            $project: {
                _id: 1,
                title: 1,
                main_author: 1,
                publisher: 1,
                yearPub: 1,
                isbn: 1,
                Fil: 1,
                Ref: 1,
                Bio: 1,
                Res: 1,
                call_number: 1,
                location: 1,
                accession_numbers: { $first: "$accession_numbers.accession_number" },
            }
        }
    ])

    book.map(b => {
        let new_callnumber = ""
        if (b.Fil == true) {
            new_callnumber = "FIL " + b.call_number
        } else if (b.Ref == true) {
            new_callnumber = "REF " + b.call_number
        } else if (b.Bio == true) {
            new_callnumber = "BIO " + b.call_number
        } else if (b.Res == true) {
            new_callnumber = "RES " + b.call_number
        } else {
            new_callnumber = "N/A " + b.call_number
        }
        b.call_number = new_callnumber
    })

    // console.log(book)
    res.status(200).json({
        success: true,
        book,
    })
}

exports.getBookAccreditation = async (req, res, next) => {
    let sub_arr = []
    let subjects = req.body.subjects

    if (subjects == undefined) {
        subjects = "No Subject"
    }

    const isArray = Array.isArray(subjects)
    if (isArray == false) {
        sub_arr = [subjects]
    } else {
        sub_arr = subjects
    }

    const book = await Book.aggregate([
        { $match: { "subjects": { "$in": sub_arr } } },
        {
            "$lookup": {
                "from": "accessions",
                "localField": "accession_numbers",
                "foreignField": "_id",
                "pipeline": [
                    {
                        $project: {
                            _id: 0,
                            accession_number: 1,
                        }
                    }
                ],
                "as": "accession_numbers"
            }

        },
        {
            $project: {
                _id: 1,
                title: 1,
                main_author: 1,
                publisher: 1,
                yearPub: 1,
                subjects: 1,
                isbn: 1,
                Fil: 1,
                Ref: 1,
                Bio: 1,
                Res: 1,
                call_number: 1,
                location: 1,
                accession_numbers: { $first: "$accession_numbers.accession_number" },
            }
        }
    ])

    book.map(b => {
        let new_callnumber = ""
        if (b.Fil == true) {
            new_callnumber = "FIL " + b.call_number
        } else if (b.Ref == true) {
            new_callnumber = "REF " + b.call_number
        } else if (b.Bio == true) {
            new_callnumber = "BIO " + b.call_number
        } else if (b.Res == true) {
            new_callnumber = "RES " + b.call_number
        } else {
            new_callnumber = "N/A " + b.call_number
        }
        b.call_number = new_callnumber
    })

    const bookSubjects = await Book.distinct('subjects')

    // console.log(book)
    res.status(200).json({
        success: true,
        book,
        bookSubjects,
    })
}

exports.BookAccreditationList = async (req, res, next) => {
    // const bookSubjects = await Return.aggregate([
    //     {
    //         $lookup: {
    //             "from": "books",
    //             "localField": "bookId",
    //             "foreignField": "_id",
    //             'pipeline': [{
    //                 $project: {
    //                     _id: 0,
    //                     subjects: 1,
    //                 }
    //             }],
    //             "as": "bookId"
    //         },

    //     },
    //     {
    //         $project: {
    //             _id: 0,
    //             subjects: "$bookId.subjects",
    //         }
    //     },
    //     {
    //         $unwind: "$subjects"
    //     },
    //     {
    //         $unwind: "$subjects"
    //     },
    //     {
    //         $group: {
    //             _id: "$subjects",
    //             count: { $sum: 1 }
    //         }
    //     },
    //     {
    //         $project: {
    //             _id: 0,
    //             _id: "$_id",
    //             count: 1
    //         }
    //     },
    // ])
    const min_date = new Date(req.body.min_date)
    const max_date = new Date(req.body.max_date)

    const bookSubjects = await Return.aggregate([
        {
            $match: {
                returnedDate: { $gte: min_date, $lte: max_date },
            },
        },
        {
            $lookup: {
                "from": "books",
                "localField": "bookId",
                "foreignField": "_id",
                'pipeline': [{
                    $project: {
                        _id: 0,
                        subjects: 1,
                    }
                }],
                "as": "bookId"
            },

        },
        {
            $project: {
                _id: 0,
                subjects: "$bookId.subjects",
            }
        },
        {
            $unwind: "$subjects"
        },
        {
            $unwind: "$subjects"
        },
        {
            $group: {
                _id: "$subjects",
                count: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                _id: "$_id",
                count: 1
            }
        },
    ])

    console.log(req.body.min_date, req.body.max_date)

    //     const one_day = 1000 * 60 * 60 * 24; // milliseconds in one day
    // const num_days = Math.round((max_date - min_date) / one_day); // round to nearest integer

    const userCourse = await Return.aggregate([
        {
            $match: {
                returnedDate: { $gte: min_date, $lte: max_date },
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                pipeline: [
                    {
                        $project: {
                            _id: 0,
                            course: 1,
                        },
                    },
                ],
                as: "userId",
            },
        },
        {
            $unwind: "$userId",
        },
        {
            $group: {
                _id: "$userId.course",
                count: {
                    $sum: 1,
                },
            },
        },
    ]);

    let total_days = 0;
    const new_min_date = min_date
    const new_max_date = max_date

    while (new_min_date <= new_max_date) {
        if (new_min_date.getDay() !== 0 && new_min_date.getDay() !== 6) {
            total_days++;
        }
        new_min_date.setDate(new_min_date.getDate() + 1);
    }
    const courseCount = userCourse.reduce((acc, val) => acc + val.count, 0);
    const subjectCount = bookSubjects.reduce((acc, val) => acc + val.count, 0);

    const courseAverage = courseCount / total_days;
    const subjectAverage = subjectCount / total_days;

    const roundedNum = courseAverage.toFixed(2);
    const roundedSubj = subjectAverage.toFixed(2);

    res.status(200).json({
        success: true,
        bookSubjects,
        userCourse,
        courseCount,
        subjectCount,
        roundedNum,
        roundedSubj,
        total_days
    })
}

exports.checkUser = async (req, res, next) => {
    console.log(req.body.userId)
    console.log(req.body.accessionId)
    const accessionId = await Accession.findOne({ accession_number: req.body.accessionId })

    let userdetails = {}
    let bookdetails = {}
        
    const user = await User.findOne({ id_number: req.body.userId });
    // const book = await Book.findOne({ accession_numbers: { "$in": [accessionId._id] } })
    if (!user) {
        userdetails = null
    } else {
        userdetails = user
    }

    if (!accessionId) {
        bookdetails = null
    } else {
        bookdetails = await Book.findOne({ accession_numbers: { "$in": [accessionId._id] } })
    }

    res.status(200).json({
        success: true,
        userdetails,
        bookdetails
    })
}