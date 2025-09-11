import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from '../../api';
import FormButton from '../../components/ui/FormButton';
import Input from '../../components/ui/Input';
import RadioGroup from '../../components/ui/RadioGroup';
import Select from '../../components/ui/Select';
import AvailabilitySelect from "./AvailabilitySelect";
import { FileUpload } from "../../components/ui";

export default function ProfileForm() {
    const token = useMemo(() => localStorage.getItem("token"), []);
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();
    const [availabilities, setAvailabilities] = useState([]);

    // Core form state - using snake_case to match database
    const [form, setForm] = useState({
        // Basic
        first_name: "",
        middle_name: "",
        last_name: "",
        date_of_birth: "",
        gender: "",
        profileType: "",
        current_location: "",
        country: "",
        state: "",
        city: "",
        nationality: "",
        passport: false,
        driver_license: false,
        cinta_card: "",
        language: "",
        hobbies: "",
        sports: "",
        skills: "",
        availabilities: "",

        // Physical
        body_type: "",
        skin_tone: "",
        hair_length: "",
        hair_color: "",
        disabilities: "",
        distinctive_features: "",
        beard: "",
        moustache: "",
        plus_size_model: false,
        petite_model: false,
        tattoo_piercing: "",

        // body measurements
        height: "",
        weight: "",
        shoe_size: "",
        waist: "",
        hips: "",
        arm_hole: "",
        shoulder: "",
        sleeve_length: "",
        trouser_length: "",
        inseam_length: "",
        eye_color: "",
        measurement: "",
        biceps: "",
        collar: "",
        fork: "",
        above_bust: "",
        bust: "",
        under_bust: "",
        cup_size: "",
        upper_thigh: "",
        lower_thigh: "",
        till_elbow: "",

        // Additional fields
        two_wheeler: false,
        four_wheeler: false,
        lead_roles: false,
        supporting_roles: false,
        background_extras: false,
        child_roles: false,
        elderly_roles: false,
        romantic_roles: false,
        villain_roles: false,
        comedy_roles: false,
        period_roles: false,
        fantasy_sci_fi_roles: false,
        special_category: false,
        special_niche: "",
        lgbtq_friendly: false,
        theatre: false,
        print_modeling: false,
        reality_shows: false,
        hand_modeling: false,
        foot_modeling: false,
        body_double: false,
        body_double_actor_name: "",
        lookalike_actor_name: "",
        imdb_profile: "",
        acting_experience: "",
        professional_training: "",
        instagram_link: "",
        influencer_type: "",
        influencer_niche: "",
        agency_name: "",
        manager_name: "",

        // Media
        image: null,
        image_url: "",
        images: [],
        image_urls: [],
        headshot_image: null,
        headshot_image_url: "",
        full_image: null,
        full_image_url: "",
        audition_video: null,
        audition_video_url: "",

        // Links/Other
        portfolio_link: "",

        CategoryData: availabilities
    });

    // Refs to reset file inputs when needed
    const galleryInputRef = useRef(null);

    // Fetch profile on mount
    useEffect(() => {
        const source = axios.CancelToken.source();

        const fetchProfile = async () => {
            try {
                setLoading(true);
                setError("");
                const response = await axios.get(`${API}/api/user/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                    cancelToken: source.token
                });

                const u = response.data?.user || {};
                setForm(prev => ({
                    ...prev,
                    // Basics
                    first_name: u.first_name || "",
                    middle_name: u.middle_name || "",
                    last_name: u.last_name || "",
                    date_of_birth: u.date_of_birth || "",
                    gender: u.gender || "",
                    profileType: u.profileType || "",
                    current_location: u.current_location || "",
                    country: u.country || "",
                    state: u.state || "",
                    city: u.city || "",
                    nationality: u.nationality || "",
                    passport: u.passport || false,
                    driver_license: u.driver_license || false,
                    cinta_card: u.cinta_card || "",
                    language: u.language || "",
                    hobbies: u.hobbies || "",
                    sports: u.sports || "",
                    skills: u.skills || "",
                    availabilities: u.availabilities || "",

                    // Physical attributes
                    body_type: u.body_type || "",
                    skin_tone: u.skin_tone || "",
                    hair_length: u.hair_length || "",
                    hair_color: u.hair_color || "",
                    disabilities: u.disabilities || "",
                    distinctive_features: u.distinctive_features || "",
                    beard: u.beard || "",
                    moustache: u.moustache || "",
                    plus_size_model: u.plus_size_model || false,
                    petite_model: u.petite_model || false,
                    tattoo_piercing: u.tattoo_piercing || "",

                    // Body measurements
                    height: u.height || "",
                    weight: u.weight || "",
                    shoe_size: u.shoe_size || "",
                    waist: u.waist || "",
                    hips: u.hips || "",
                    arm_hole: u.arm_hole || "",
                    shoulder: u.shoulder || "",
                    sleeve_length: u.sleeve_length || "",
                    trouser_length: u.trouser_length || "",
                    inseam_length: u.inseam_length || "",
                    eye_color: u.eye_color || "",
                    measurement: u.measurement || "",
                    biceps: u.biceps || "",
                    collar: u.collar || "",
                    fork: u.fork || "",
                    above_bust: u.above_bust || "",
                    bust: u.bust || "",
                    under_bust: u.under_bust || "",
                    cup_size: u.cup_size || "",
                    upper_thigh: u.upper_thigh || "",
                    lower_thigh: u.lower_thigh || "",
                    till_elbow: u.till_elbow || "",

                    // Role preferences
                    two_wheeler: u.two_wheeler || false,
                    four_wheeler: u.four_wheeler || false,
                    lead_roles: u.lead_roles || false,
                    supporting_roles: u.supporting_roles || false,
                    background_extras: u.background_extras || false,
                    child_roles: u.child_roles || false,
                    elderly_roles: u.elderly_roles || false,
                    romantic_roles: u.romantic_roles || false,
                    villain_roles: u.villain_roles || false,
                    comedy_roles: u.comedy_roles || false,
                    period_roles: u.period_roles || false,
                    fantasy_sci_fi_roles: u.fantasy_sci_fi_roles || false,
                    special_category: u.special_category || false,
                    special_niche: u.special_niche || "",
                    lgbtq_friendly: u.lgbtq_friendly || false,
                    theatre: u.theatre || false,
                    print_modeling: u.print_modeling || false,
                    reality_shows: u.reality_shows || false,
                    hand_modeling: u.hand_modeling || false,
                    foot_modeling: u.foot_modeling || false,
                    body_double: u.body_double || false,
                    body_double_actor_name: u.body_double_actor_name || "",
                    lookalike_actor_name: u.lookalike_actor_name || "",

                    // Experience and links
                    imdb_profile: u.imdb_profile || "",
                    acting_experience: u.acting_experience || "",
                    professional_training: u.professional_training || "",
                    instagram_link: u.instagram_link || "",
                    influencer_type: u.influencer_type || "",
                    influencer_niche: u.influencer_niche || "",
                    agency_name: u.agency_name || "",
                    manager_name: u.manager_name || "",

                    // Existing media URLs
                    image_url: u.image || "",
                    image_urls: Array.isArray(u.images) ? u.images : [],
                    headshot_image_url: u.headshot_image || "",
                    full_image_url: u.full_image || "",
                    audition_video_url: u.audition_video || "",

                    // Other
                    portfolio_link: u.portfolio_link || "",
                }));
                setAvailabilities(
                    Array.isArray(u.SkillsData) ? u.SkillsData : JSON.parse(u.SkillsData || "[]")
                );

                //   SkillsData : u.SkillsData || "",
            } catch (error) {
                if (!axios.isCancel(error)) {
                    setError(error.response?.data?.message || error.message || "Failed to fetch profile");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();

        return () => {
            source.cancel("Component unmounted");
        };
    }, [token]);

    // Handlers
    const onChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(f => ({
            ...f,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const onFileChange = (e) => {
        const { name, files } = e.target;
        if (!files?.length) return;

        if (name === "images") {
            setForm(f => ({ ...f, images: [...f.images, ...Array.from(files)] }));
            if (galleryInputRef.current) galleryInputRef.current.value = "";
            return;
        }

        setForm(f => ({ ...f, [name]: files[0] }));
    };

    const removeNewGalleryItem = (idx) => {
        setForm(f => ({
            ...f,
            images: f.images.filter((_, i) => i !== idx),
        }));
    };

    // const buildFormData = () => {
    //     const fd = new FormData();

    //     // Text fields using snake_case to match database
    //     const textFields = [
    //         "first_name", "middle_name", "last_name", "date_of_birth", "gender",
    //         "profileType", "current_location", "country", "state", "city",
    //         "nationality", "cinta_card", "language", "hobbies", "sports",
    //         "skills", "availabilities", "body_type", "skin_tone", "hair_length",
    //         "hair_color", "disabilities", "distinctive_features", "beard",
    //         "moustache", "tattoo_piercing", "height", "weight", "shoe_size",
    //         "waist", "hips", "arm_hole", "shoulder", "sleeve_length",
    //         "trouser_length", "inseam_length", "eye_color", "measurement",
    //         "biceps", "collar", "fork", "above_bust", "bust", "under_bust",
    //         "cup_size", "upper_thigh", "lower_thigh", "till_elbow", "special_niche",
    //         "body_double_actor_name", "lookalike_actor_name", "imdb_profile",
    //         "acting_experience", "professional_training", "instagram_link",
    //         "influencer_type", "influencer_niche", "agency_name", "manager_name",
    //         "portfolio_link"
    //     ];

    //     textFields.forEach(key => {
    //         const v = form[key];
    //         if (v !== undefined && v !== null && `${v}`.length) {
    //             fd.append(key, v);
    //         }
    //     });

    //     // Boolean fields
    //     const booleanFields = [
    //         "passport", "driver_license", "plus_size_model", "petite_model",
    //         "two_wheeler", "four_wheeler", "lead_roles", "supporting_roles",
    //         "background_extras", "child_roles", "elderly_roles", "romantic_roles",
    //         "villain_roles", "comedy_roles", "period_roles", "fantasy_sci_fi_roles",
    //         "special_category", "lgbtq_friendly", "theatre", "print_modeling",
    //         "reality_shows", "hand_modeling", "foot_modeling", "body_double"
    //     ];

    //     booleanFields.forEach(key => {
    //         fd.append(key, form[key] ? "1" : "0");
    //     });

    //     // Append files only if newly selected
    //     if (form.image instanceof File) fd.append("image", form.image);
    //     if (form.headshot_image instanceof File) fd.append("headshot_image", form.headshot_image);
    //     if (form.full_image instanceof File) fd.append("full_image", form.full_image);
    //     if (form.audition_video instanceof File) fd.append("audition_video", form.audition_video);

    //     if (Array.isArray(form.images) && form.images.length) {
    //         form.images.forEach(file => {
    //             if (file instanceof File) fd.append("images", file);
    //         });
    //     }

    //     return fd;
    // };



    const buildFormData = () => {
        const fd = new FormData();

        // Text fields using snake_case to match database
        const textFields = [
            "first_name", "middle_name", "last_name", "date_of_birth", "gender",
            "profileType", "current_location", "country", "state", "city",
            "nationality", "cinta_card", "language", "hobbies", "sports",
            "skills", "availabilities", "body_type", "skin_tone", "hair_length",
            "hair_color", "disabilities", "distinctive_features", "beard",
            "moustache", "tattoo_piercing", "height", "weight", "shoe_size",
            "waist", "hips", "arm_hole", "shoulder", "sleeve_length",
            "trouser_length", "inseam_length", "eye_color", "measurement",
            "biceps", "collar", "fork", "above_bust", "bust", "under_bust",
            "cup_size", "upper_thigh", "lower_thigh", "till_elbow", "special_niche",
            "body_double_actor_name", "lookalike_actor_name", "imdb_profile",
            "acting_experience", "professional_training", "instagram_link",
            "influencer_type", "influencer_niche", "agency_name", "manager_name",
            "portfolio_link"
        ];

        textFields.forEach(key => {
            const v = form[key];
            if (v !== undefined && v !== null && `${v}`.length) {
                fd.append(key, v);
            }
        });

        // Boolean fields
        const booleanFields = [
            "passport", "driver_license", "plus_size_model", "petite_model",
            "two_wheeler", "four_wheeler", "lead_roles", "supporting_roles",
            "background_extras", "child_roles", "elderly_roles", "romantic_roles",
            "villain_roles", "comedy_roles", "period_roles", "fantasy_sci_fi_roles",
            "special_category", "lgbtq_friendly", "theatre", "print_modeling",
            "reality_shows", "hand_modeling", "foot_modeling", "body_double"
        ];

        booleanFields.forEach(key => {
            fd.append(key, form[key] ? "1" : "0");
        });

        // ✅ Add CategoryData
        if (Array.isArray(form.CategoryData) && form.CategoryData.length) {
            fd.append("CategoryData", JSON.stringify(form.CategoryData));
        }

        // Append files only if newly selected
        if (form.image instanceof File) fd.append("image", form.image);
        if (form.headshot_image instanceof File) fd.append("headshot_image", form.headshot_image);
        if (form.full_image instanceof File) fd.append("full_image", form.full_image);
        if (form.audition_video instanceof File) fd.append("audition_video", form.audition_video);

        if (Array.isArray(form.images) && form.images.length) {
            form.images.forEach(file => {
                if (file instanceof File) fd.append("images", file);
            });
        }

        return fd;
    };
    // const onSubmit = async () => {
    //     debugger
    //     try {
    //         setSaving(true);
    //         setError("");
    //         setSuccess("");

    //         const fd = buildFormData();

    //         const response = await axios.put(`${API}/api/user/profile`, fd, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 "Content-Type": "multipart/form-data",
    //             },
    //         });

    //         setSuccess("Profile updated successfully!");
    //         navigate('/user/popular-casting-calls')
    //         // Merge back returned user to refresh URLs
    //         const u = response.data?.user || {};
    //         setForm(prev => ({
    //             ...prev,
    //             image: null,
    //             headshot_image: null,
    //             full_image: null,
    //             audition_video: null,
    //             images: [],
    //             image_url: u.image || prev.image_url,
    //             image_urls: Array.isArray(u.images) ? u.images : prev.image_urls,
    //             headshot_image_url: u.headshot_image || prev.headshot_image_url,
    //             full_image_url: u.full_image || prev.full_image_url,
    //             audition_video_url: u.audition_video || prev.audition_video_url,
    //         }));
    //     } catch (error) {
    //         setError(error.response?.data?.message || error.message || "Failed to update profile");
    //     } finally {
    //         setSaving(false);
    //     }
    // };
    const onSubmit = async () => {
        debugger
        try {
            setSaving(true);
            setError("");
            setSuccess("");

            const fd = buildFormData();

            // ✅ Add availabilities directly into fd
            availabilities.forEach((item, index) => {
                fd.append(`SkillsData[${index}]`, item);
            });

            const response = await axios.put(`${API}/api/user/profile`, fd, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            setSuccess("Profile updated successfully!");
            navigate('/user/popular-casting-calls');

            // Merge back returned user to refresh URLs
            const u = response.data?.user || {};
            setForm(prev => ({
                ...prev,
                image: null,
                headshot_image: null,
                full_image: null,
                audition_video: null,
                images: [],
                image_url: u.image || prev.image_url,
                image_urls: Array.isArray(u.images) ? u.images : prev.image_urls,
                headshot_image_url: u.headshot_image || prev.headshot_image_url,
                full_image_url: u.full_image || prev.full_image_url,
                audition_video_url: u.audition_video || prev.audition_video_url,
            }));
        } catch (error) {
            setError(error.response?.data?.message || error.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    const Section = ({ children }) => (
        <section className="space-y-6">
            <div className="grid grid-cols-1 gap-3">{children}</div>
        </section>
    );

    // Select Options
    const selectOptions = {
        gender: ["Male", "Female", "Other"],
        profileType: ["All", "ACTORS & ACTRESS", "FASHION MODELS", "KIDS", "INFLUENCERS", "VOICE OVER", "DANCERS", "Freelance Foreigners", "Talent Agencies", "Theater Artist"],
        passport: ["Yes", "No"],
        driver_license: ["Yes", "No"],
        skills: ["Dance Styles ", "Indian dance form ", "Singing Ability", "Vocal Range", "indian/classical singing", "Musical Instruments", "Combat Training", "Stunt Skills", "Swimming Ability", "Horse Riding", "Driving Skills", "Sports Skills", "Acrobatics/Gymnastics", "Voice Acting", "yoga", "PODCASTING/ ANCHORING", "TELEPROMPTER"],
        availabilities: ["Full-Time availabilities", "Part-Time availabilities", "Available for International Projects", "Available for Long-Term Projects", "Available for Short Films", "Available for Advertisements", "Available for Music Videos", "Available for Web Series", "Available for Voice-over Work", "Available for Live Events"],
        body_type: ["Slim", "Healthy", "Average", "Chubby", "Short Height", "Athletic", "Plus Size"],
        skin_tone: ["VITILIGO", "WHEATISH", "DUSKY", "FAIR"],
        hair_length: ["SMALL", "Medium", "Long", "MILATRY CUT", "CURLY", "FUNKY"],
        tattoo: ["Yes", "No", "HIDDEN", "TEMPORARY", "PERMANENT", "MENTION VISIBLE BODY PART", "QWERKY PIERCINGS", "EYEBROW", "SEPTUM"],
        eye_color: ["BLACK", "BROWN", "ANY OTHER"],
        disabilities: ["DEAF", "DUMB", "DOWN SYNDROME", "BLIND", "CLEFT PALATE", "LOCOMOTOR DISABILITY", "ANY OTHER"],
        hair_color: ["BLACK", "BROWN", "FUNKY", "ANY OTHER"],
        two_wheeler: ["Yes", "No"],
        four_wheeler: ["Yes", "No"],
        beard: ["CLEAN SHAVE", "NORMAL", "LONG", "BLACK", "WHITE", "SALT & PEPPER", "STUBBLE", "COLOURED BEARD", "ANY OTHER"],
        moustache: ["Yes", "No"],
        shoe_size: ["6", "7", "8", "9", "10"],
        character_roles: [
            "Lead Roles",
            "Supporting Roles",
            "Background/Extras",
            "Child Roles",
            "Elderly Roles",
            "Romantic Roles",
            "Villain/Negative Roles",
            "Comedy Roles",
            "Period/Historical Roles",
            "Fantasy/Sci-fi Roles",
            "Special category",
        ],
        gender_representation: ["LGBTQ+ Friendly"],
        experience: ["in Theatre", "in Print/Modeling", "in Reality Shows"],
    };

    const characterRoleOptions = selectOptions.character_roles;
    const genderRepresentationOptions = selectOptions.gender_representation;
    const experienceOptions = selectOptions.experience;

    const Checkbox = ({ name, label, checked, onChange }) => (
        <label className="flex items-center gap-2">
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{label}</span>
        </label>
    );

    const handleCheckboxChange = (e, category) => {
        const { value, checked } = e.target;
        // Handle checkbox logic here
        console.log(category, value, checked);
    };

    const steps = [
        // Step 1: Basic
        (
            <Section>
                <div className="text-lg font-semibold text-primary mb-6">• Personal Information</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Input placeholder="First Name*" name="first_name" value={form.first_name} onChange={onChange} />
                    <Input placeholder="Middle Name" name="middle_name" value={form.middle_name} onChange={onChange} />
                    <Input placeholder="Last Name*" name="last_name" value={form.last_name} onChange={onChange} />
                    <Input type="date" placeholder="Date Of Birth*" name="date_of_birth" value={form.date_of_birth} onChange={onChange} />
                    <Select placeholder="Gender*" name="gender" value={form.gender} onChange={onChange} options={selectOptions.gender} />
                    <Select placeholder="Profile Type*" name="profileType" value={form.profileType} onChange={onChange} options={selectOptions.profileType} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Input placeholder="Current Location*" name="current_location" value={form.current_location} onChange={onChange} />
                    <Input placeholder="Country*" name="country" value={form.country} onChange={onChange} />
                    <Input placeholder="State*" name="state" value={form.state} onChange={onChange} />
                    <Input placeholder="City*" name="city" value={form.city} onChange={onChange} />
                    <Input placeholder="Nationality*" name="nationality" value={form.nationality} onChange={onChange} />
                </div>

                {/* Section 3 - Passport, Driver License, CINTA Card */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Select name="passport" value={form.passport ? "Yes" : "No"} onChange={(e) => setForm(f => ({ ...f, passport: e.target.value === "Yes" }))} options={selectOptions.passport} placeholder="Passport*" />
                    <Select name="driver_license" value={form.driver_license ? "Yes" : "No"} onChange={(e) => setForm(f => ({ ...f, driver_license: e.target.value === "Yes" }))} options={selectOptions.driver_license} placeholder="Driver License*" />
                    <Input placeholder="CINTA Card" name="cinta_card" value={form.cinta_card} onChange={onChange} />
                </div>

                {/* Section 4 - Language, Hobbies, Sports */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Input placeholder="Language*" name="language" value={form.language} onChange={onChange} />
                    <Input placeholder="Hobbies" name="hobbies" value={form.hobbies} onChange={onChange} />
                    <Input placeholder="Sports" name="sports" value={form.sports} onChange={onChange} />
                </div>

                {/* Section 5 - Skills, availabilities */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                    <div>
                        <div className="text-lg font-semibold text-primary mb-6">• Skills/Abilities</div>
                        <Select name="skills" value={form.skills} onChange={onChange} options={selectOptions.skills} placeholder="Skills" />
                    </div>

                    <div>
                        <div className="text-lg font-semibold text-primary mb-6">• Availabilities</div>
                        <Select name="availabilities" value={form.availabilities} onChange={onChange} options={selectOptions.availabilities} placeholder="Availabilities" />
                    </div>
                </div>

                <div>
                    {/* <div className="text-lg font-semibold text-primary mb-6">• Availabilities</div>
                        <Select name="availabilities" value={form.availabilities} onChange={onChange} options={selectOptions.availabilities} placeholder="Availabilities" /> */}

                    <AvailabilitySelect availabilities={availabilities} setAvailabilities={setAvailabilities} />
                </div>
            </Section>
        ),

        // Step 2: Physical
        (
            <Section key="s2">
                {/* Physical Attributes Fields */}
                <div className="text-lg font-semibold text-primary mb-6">• Physical Attributes</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Select name="body_type" value={form.body_type} onChange={onChange} options={selectOptions.body_type} placeholder="Body Type*" />
                    <Select name="skin_tone" value={form.skin_tone} onChange={onChange} options={selectOptions.skin_tone} placeholder="Skin Tone*" />
                    <Select name="hair_length" value={form.hair_length} onChange={onChange} options={selectOptions.hair_length} placeholder="Hair Length*" />
                    <Select name="tattoo_piercing" value={form.tattoo_piercing} onChange={onChange} options={selectOptions.tattoo} placeholder="Tattoo/Piercing*" />
                    <Select name="disabilities" value={form.disabilities} onChange={onChange} options={selectOptions.disabilities} placeholder="Disabilities*" />
                    <Input placeholder="Distinctive Features*" name="distinctive_features" value={form.distinctive_features} onChange={onChange} />

                    {/* Gender Based Fields */}
                    {form.gender === 'Male' && (
                        <>
                            <Input placeholder="Moustache*" name="moustache" value={form.moustache} onChange={onChange} />
                            <Select name="beard" value={form.beard} onChange={onChange} options={selectOptions.beard} placeholder="Beard*" />
                        </>
                    )}

                    {form.gender === 'Female' && (
                        <>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="plus_size_model"
                                    checked={form.plus_size_model}
                                    onChange={onChange}
                                    className="mr-2"
                                />
                                <label>Plus-size Model/Actor</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="petite_model"
                                    checked={form.petite_model}
                                    onChange={onChange}
                                    className="mr-2"
                                />
                                <label>Petite Model/Actor</label>
                            </div>
                        </>
                    )}
                </div>

                {/* Body Measurement Fields Weight, Shoe Size */}
                <div className="text-lg font-semibold text-primary mb-6">• Body Measurement</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Input placeholder="Height*" name="height" value={form.height} onChange={onChange} />
                    <Input placeholder="Weight*" name="weight" value={form.weight} onChange={onChange} />
                    <Input placeholder="Shoe Size*" name="shoe_size" value={form.shoe_size} onChange={onChange} />
                    <Input placeholder="Waist*" name="waist" value={form.waist} onChange={onChange} />
                    <Input placeholder="Hips 32”/ 86 CM*" name="hips" value={form.hips} onChange={onChange} />
                    <Input placeholder="Arm Hole*" name="arm_hole" value={form.arm_hole} onChange={onChange} />
                    <Input placeholder="Shoulder*" name="shoulder" value={form.shoulder} onChange={onChange} />
                    <Input placeholder="Sleeve Length*" name="sleeve_length" value={form.sleeve_length} onChange={onChange} />
                    <Input placeholder="Trouser Length*" name="trouser_length" value={form.trouser_length} onChange={onChange} />
                    <Input placeholder="Inseam Length*" name="inseam_length" value={form.inseam_length} onChange={onChange} />
                    <Select name="eye_color" value={form.eye_color} onChange={onChange} options={selectOptions.eye_color} placeholder="Eye Color*" />
                    <Select name="hair_color" value={form.hair_color} onChange={onChange} options={selectOptions.hair_color} placeholder="Hair Color*" />
                    <Input placeholder="Measurement*" name="measurement" value={form.measurement} onChange={onChange} />

                    {/* Gender Based Fields */}
                    {form.gender === 'Male' && (
                        <>
                            <Input placeholder="Biceps*" name="biceps" value={form.biceps} onChange={onChange} />
                            <Input placeholder="Collar*" name="collar" value={form.collar} onChange={onChange} />
                            <Input placeholder="Fork*" name="fork" value={form.fork} onChange={onChange} />
                        </>
                    )}

                    {form.gender === 'Female' && (
                        <>
                            <Input name="bust" value={form.bust} onChange={onChange} placeholder="Bust*" />
                            <Input name="cup_size" value={form.cup_size} onChange={onChange} placeholder="Cup Size*" />
                            <Input name="above_bust" value={form.above_bust} onChange={onChange} placeholder="Above Bust*" />
                            <Input name="under_bust" value={form.under_bust} onChange={onChange} placeholder="Under Bust*" />
                            <Input name="upper_thigh" value={form.upper_thigh} onChange={onChange} placeholder="Upper Thigh*" />
                            <Input name="lower_thigh" value={form.lower_thigh} onChange={onChange} placeholder="Lower Thigh*" />
                            <Input name="till_elbow" value={form.till_elbow} onChange={onChange} placeholder="Till Elbow*" />
                        </>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <RadioGroup
                        label="• Can you ride a 2 wheeler?"
                        name="two_wheeler"
                        options={['Yes', 'No']}
                        value={form.two_wheeler ? 'Yes' : 'No'}
                        onChange={(e) => setForm(f => ({ ...f, two_wheeler: e.target.value === 'Yes' }))}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <RadioGroup
                        label="• Can you ride a 4 wheeler?"
                        name="four_wheeler"
                        options={['Yes', 'No']}
                        value={form.four_wheeler ? 'Yes' : 'No'}
                        onChange={(e) => setForm(f => ({ ...f, four_wheeler: e.target.value === 'Yes' }))}
                    />
                </div>
            </Section>
        ),

        // Step 3: Media
        (
            <Section key="s3" title="Media Uploads" subtitle="Upload photos and videos">
                <div className="w-full min-h-screen bg-white p-4">
                    <form className="space-y-8 max-w-6xl mx-auto">

                        {/* Character/Role Suitability */}
                        <div>
                            <div className="text-lg font-semibold text-primary mb-6">• Character/Role Suitability</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                {characterRoleOptions.map((option, index) => (
                                    <Checkbox
                                        key={index}
                                        label={option}
                                        name="characterRoles"
                                        value={option}
                                        onChange={(e) => handleCheckboxChange(e, 'characterRoles')}
                                    />
                                ))}
                            </div>
                        </div>


                        {/* Transgender/Non-Binary Representation */}
                        <div>
                            <div className="text-lg font-semibold text-primary mb-6">• Transgender/Non-Binary Representation</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                {genderRepresentationOptions.map((option, index) => (
                                    <Checkbox
                                        key={index}
                                        label={option}
                                        name="genderRepresentation"
                                        value={option}
                                        onChange={(e) => handleCheckboxChange(e, 'genderRepresentation')}
                                    />
                                ))}
                            </div>
                        </div>


                        {/* Experience */}
                        <div>
                            <div className="text-lg font-semibold text-primary mb-6">• Experience</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                {experienceOptions.map((option, index) => (
                                    <Checkbox
                                        key={index}
                                        label={option}
                                        name="experience"
                                        value={option}
                                        onChange={(e) => handleCheckboxChange(e, 'experience')}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Professional Details/Work Links */}
                        <div>
                            <div className="text-lg font-semibold text-primary mb-6">• Professional Details/Work Links</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <Input placeholder="IMDB profile*" name="imdbProfile" value={form.imdbProfile} onChange={onChange} />
                                <Input placeholder="Acting experience*" name="actingExperience" value={form.actingExperience} onChange={onChange} />
                                <Input placeholder="Professional training*" name="professionalTraining" value={form.professionalTraining} onChange={onChange} />

                                <Input placeholder="Instagram link*" name="instagramLink" value={form.instagramLink} onChange={onChange} />
                                <Input placeholder="Influencer(micro, macro, nano, ugc)*" name="influencerType" value={form.influencerType} onChange={onChange} />
                                <Input placeholder="Specify niche*" name="specifyNiche" value={form.specifyNiche} onChange={onChange} />

                                <FileUpload
                                    label="Headshot (Close-up)*"
                                    name="headshot_image" Changed to match backend
                                    type="image"
                                    onChange={(e) => setFormData({ ...formData, headshot: e.target.files[0] })}
                                />


                                <FileUpload
                                    label="Full Photo*"
                                    name="full_image" Changed to match backend
                                    type="image"
                                    onChange={(e) => setFormData({ ...formData, fullPhoto: e.target.files[0] })}
                                />

                                <FileUpload
                                    label="Audition Video / Intro*"
                                    name="audition_video" Changed to match backend
                                    type="video"
                                    onChange={(e) => setFormData({ ...formData, introVideo: e.target.files[0] })}
                                />


                                <Input placeholder="Portfolio / Show reel Link*" name="profileLink" value={form.profileLink} onChange={onChange} />
                                <Input placeholder="Instagram / Social Media Link*" name="socialmediaLink" value={form.socialmediaLink} onChange={onChange} />
                            </div>
                        </div>

                        {/* Agency Details */}
                        <div>
                            <div className="text-lg font-semibold text-primary mb-6">• If With Any Agency [Mention Name/ Manager’s Name]</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input placeholder="Agency Name" name="agencyName" value={form.agencyName} onChange={onChange} />
                                <Input placeholder="Manager Name" name="managerName" value={form.managerName} onChange={onChange} />
                            </div>
                        </div>

                        {/* Hand Modeling Suitability */}
                        <RadioGroup
                            label="Hand Modeling Suitability"
                            name="handModeling"
                            options={['Yes', 'No']}
                            value={form.handModeling}
                            onChange={onChange}
                        />

                        {/* Foot Modeling Suitability */}
                        <RadioGroup
                            label="Foot Modeling Suitability"
                            name="footModeling"
                            options={['Yes', 'No']}
                            value={form.footModeling}
                            onChange={onChange}
                        />

                        {/* Body Double Checkbox */}
                        <div>
                            <label className="inline-flex items-center space-x-2 mt-6">
                                <input
                                    type="checkbox"
                                    name="bodyDouble"
                                    checked={form.bodyDouble}
                                    onChange={onChange}
                                    className="form-checkbox h-5 w-5 text-purple-600"
                                />
                                <span className='text-lg font-semibold text-primary'>Comfortable With Body Double</span>
                            </label>
                        </div>

                        {/* Actor Double Name */}
                        <div className="text-lg font-semibold text-primary mb-6">• Specify Actor Name If You Are Already A Body Double</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <Input placeholder="Actor Name" name="actorDoubleName" value={form.actorDoubleName} onChange={onChange} />
                        </div>
                        <div className="text-lg font-semibold text-primary mb-6">• Specify Actor If You Are A Lookalike</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <Input placeholder="Specify Actor" name="lookalikeActor" value={form.lookalikeActor} onChange={onChange} />
                        </div>

                    </form>
                </div>
            </Section>
        ),
    ];

    return (
        <div className="min-h-screen bg-white py-8 px-4">
            <div className="mx-auto">
                <div className="p-5 sm:p-8">
                    {loading ? (
                        <div className="text-center py-10">Loading profile…</div>
                    ) : (
                        <div className="space-y-6">{steps[step - 1]}</div>
                    )}

                    {/* Alerts */}
                    {!!error && (
                        <div className="mt-6 p-3 rounded-lg bg-red-50 text-red-700 border border-red-200 text-sm">{error}</div>
                    )}
                    {!!success && (
                        <div className="mt-6 p-3 rounded-lg bg-green-50 text-green-700 border border-green-200 text-sm">{success}</div>
                    )}

                    {/* Actions */}
                    <div className="mt-6 flex items-center justify-between gap-3">
                        <FormButton
                            label="Previous"
                            onClick={() => setStep(s => Math.max(1, s - 1))}
                            disabled={loading || saving || step === 1}
                        />

                        {step < steps.length ? (
                            <FormButton
                                label={saving ? 'Saving...' : 'Save and Next'}
                                onClick={() => setStep(s => Math.min(steps.length, s + 1))}
                                disabled={loading || saving}
                            />
                        ) : (
                            <FormButton
                                label={saving ? 'Submitting...' : 'Save and Submit'}
                                onClick={onSubmit}
                                disabled={loading || saving}
                            />
                        )}
                    </div>

                    <p className="mt-3 text-xs text-gray-500">Accepted images: jpg, jpeg, png · Video: mp4, mkv, avi, mov · Max ~200MB</p>
                </div>
            </div>
        </div>
    );
}